import {Component,Input,OnInit,OnChanges,OnDestroy,SimpleChanges,ElementRef} from '@angular/core';
import { Observable } from "rxjs/Observable";
import {TaskItem} from "../../global/_models/task-item.model";
import {TaskListService} from "../../global/_services/task-list.service";
import {ShowCompletePipe} from "../../global/_pipes/show-complete.pipe";

@Component({
  selector: 'task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.less'],
	host: {
		'(document:click)': 'onOuterClick($event)',
	},
})
export class TaskListItemComponent implements OnInit {

  constructor(private TaskListService:TaskListService,private _eref:ElementRef,private ShowCompletePipe: ShowCompletePipe) { }
  
	@Input() item: TaskItem;
	@Input() path: string;
	@Input() edit: boolean = false;
	@Input() showComplete: boolean = false;
	@Input() subitemsOpen: Array<string> = [];
	
	item$: any;
	location: any;
	menuOpen: boolean = false;
	newItem: TaskItem = {
		name: ''
		,completed: false
	};
	showNewItem: boolean = false;
	subitems$: Observable<any>;
	subitems: Array<TaskItem>;
	
	ngOnInit() {
		//console.log('init item',this.getItemPath());
		this.showNewItem = (this.subitemsOpen.indexOf(this.getItemPath()) != -1);
		
		this.loadItem();
		this.loadSubItems();
		
		/*if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
		}*/
	}
	
	ngOnChanges() {
		this.loadSubItems();
	}
	
	canMarkComplete() {
		let canComplete:boolean = true;
		
		if (!this.item.items || !this.item.items.length) {
			for (let itemId in this.item.items) {
				if (!this.item.items[itemId].completed) {
					canComplete = false;
				}
			}
		}
		return canComplete;
	}
	closeMenu() {
		this.menuOpen = false;
	}
	deleteItem() {
		let canDelete: boolean = true;
		if (!this.canMarkComplete()) {
			canDelete = confirm('are you sure?  Any subitems will be deleted also.  This cannot be undone!')
		} else {
			canDelete = confirm('Are you sure? This cannot be undone!');
		}
		if (canDelete) this.item$.remove();
	}
	editItem() {
		this.closeMenu();
		this.edit = true;
	}
	getItemPath() {
		let path = this.path + '/items';
		if (this.item.$key) path += '/' + this.item.$key;
		return path;
	}
	loadItem() {
		this.item$ = this.TaskListService.getItem(this.getItemPath());
	}
	loadSubItems() {
		this.subitems$ = this.TaskListService.getItems(this.getItemPath());
		this.subitems$.subscribe(this.setSubitems.bind(this));
	}
	
	markCompleted() {
		//console.log('mark completed');
		if (this.canMarkComplete()) {
			//console.log(this.location);
			let updatePkg = {
				completed:true,
				location: {},
			};
			alert('complete!');
			/*if (this.location) {
				//console.log('save location',this.location.coords);
				//Object.assign(updatePkg.location,this.location.coords);
				for (let key in this.location.coords) {
					//console.log(key);
					updatePkg.location[key] = this.location.coords[key];
				}
			}*/
			console.log('updatePkg',updatePkg);
			this.item$.update(updatePkg);
		}
	}
	
	markIncomplete() {
		console.log('mark incomplete');
		this.item$.update({completed:null});
	}
	
	onEditCancel() {
		this.edit = false;
	}
	onEditSave() {
		this.edit = true;
	}
	onNewItemCancel() {
		this.showNewItem = false;
		this.subitemsOpen.splice(this.subitemsOpen.indexOf(this.getItemPath()),1)
	}
	onNewItemSave() {
		// TODO: Add a user control to toggle the default of this behaviour
		this.newItem = {
			name: ''
			,completed: false
		};
		//this.showNewItem = true;
		console.log('onNewItemSave()',this.getItemPath(),this.showNewItem);
	}
	onOuterClick(event) {
		if (!this._eref.nativeElement.contains(event.target)) {
			this.closeMenu();
		}
	}
	getPosition() {
		/*if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(position => {return position;});
		}*/
	}
	setPosition(position) {
		this.location = position;
		//console.log('set position',position.coords);
	}
	setSubitems(data) {
		//let scp = new ShowCompletePipe();
		this.subitems = !this.showComplete ? this.ShowCompletePipe.transform(data) : data;
	}
	showNewItemForm() {
		this.closeMenu();
		if (this.subitemsOpen.indexOf(this.getItemPath()) == -1) this.subitemsOpen.push(this.getItemPath());
		this.showNewItem = true;
		
	}
	
	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}
}
