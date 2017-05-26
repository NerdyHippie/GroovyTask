import {Component,Input,OnInit,OnChanges,OnDestroy,SimpleChanges,ElementRef,Renderer2} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TaskItem } from '../../global/_models/task-item.model';
import { TaskList } from '../../global/_models/task-list.model';
import {TaskListService} from "../../global/_services/task-list.service";
import {ShowCompletePipe} from "../../global/_pipes/show-complete.pipe";
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
	host: {
		'(document:click)': 'onOuterClick($event)',
	},
})
export class TaskListComponent implements OnInit,OnChanges,OnDestroy {
	constructor(private TaskListService:TaskListService,private renderer:Renderer2,private _eref:ElementRef,private ShowCompletePipe: ShowCompletePipe,private dragulaService:DragulaService) {
		/*dragulaService.drop.subscribe((value) => {
			console.warn(`drop: ${value[0]}`,value);
			this.onDrop(value.slice(1));
		});*/
		dragulaService.dropModel.subscribe((value) => {
			console.warn(`dropModel: ${value[0]}`,value.slice(1));
			this.onDropModel(value.slice(1));
		});
		dragulaService.removeModel.subscribe((value) => {
			console.warn(`removeModel: ${value[0]}`);
			this.onRemoveModel(value.slice(1));
		});
	}
	
	@Input() list: TaskList;
	
	editMode: boolean = false;
	listItems$: any;
	listItems: Array<TaskItem>;
	listMembers$: any;
	newItem: TaskItem = {
		name: ''
		,completed: false
	};
	menuOpen: boolean = false;
	showComplete: boolean = false;
	showNewItem: boolean = false;
	subitemsOpen: Array<string> = [];
	tasklist$: any;
	tasklist: TaskList;
	
	ngOnInit() {
		this.loadList();
		this.loadItems();
	}
	ngOnChanges(changes:SimpleChanges) {
		//console.log('task-list data changed',changes);
	}
	ngOnDestroy() {}
	
	
	
	closeMenu() {
		if (this.menuOpen) this.menuOpen = false;
	}
	
	deleteList() {
		this.closeMenu();
		if (confirm('Are you sure?  This cannot be undone!')) {
			let listId:string = this.tasklist.$key;
			
			this.listMembers$ = this.TaskListService.getListRights('list2user',listId);
			this.listMembers$.subscribe(data => this.deleteListForUsers(data,listId));
		}
	}
	deleteListForUsers(members,listId) {
		this.tasklist$.remove();
		
		for (let key in members) {
			this.TaskListService.getListRights('user2list',listId,key).remove();
		}
		
		this.listMembers$.remove();
	}
	
	editList() {
		this.closeMenu();
		this.editMode = true;
	}
	
	loadItems() {
		this.listItems$ = this.TaskListService.getItems(this.list.$key);
		this.listItems$.subscribe(this.setListItems.bind(this));
	}
	
	loadList() {
		this.tasklist$ = this.TaskListService.getTasklist(this.list.$key);
		this.tasklist$.subscribe(data => this.tasklist = data);
	}
	
	onCancelListEdit() {
		this.editMode = false;
	}
	
	onCancelNewItem() {
		//console.log('onCancelNewItem from task-list')
		this.showNewItem = false;
	}
	
	private onDrop(args) {
		let [e, el, target,source,sibling] = args;
		console.log('item dropped');
		console.log(e);
		console.log(el);
		
		// do something
	}
	private onDropModel(args) {
		let [bagName,el,target,source] = args;
		console.log('item dropped in %o',bagName);
		console.log(el);
		console.log(target);
		console.log(source);
		
		let elmt = this.renderer.selectRootElement(el);
		this.renderer.setStyle(elmt,'border','1px solid red');
		console.log('moved element',elmt);
		// do something
	}
	private onRemoveModel(args) {
		let [bagName,el,target,source] = args;
		console.log('item removed in %o',bagName);
		console.log(el);
		console.log(target);
		console.log(source);
		
		// do something
	}
	
	onSaveNewItem() {
		this.newItem = {
			name: ''
			,completed: false
		};
	}
	
	onListSave() {
		this.editMode = false;
	}
	
	onOuterClick(event) {
		if (!this._eref.nativeElement.contains(event.target)) {
			this.closeMenu();
		}
	}
	
	setListItems(data) {
		//let scp = new ShowCompletePipe();
		this.listItems = !this.showComplete ? this.ShowCompletePipe.transform(data) : data;
	}
	
	showNewItemForm() {
		this.showNewItem = true;
	}
	
	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}
	toggleShowComplete() {
		this.closeMenu();
		this.showComplete = !this.showComplete;
	}
}
