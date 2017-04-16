import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {TaskItem} from "../../global/_models/task-item.model";
import {TaskListService} from "../../global/_services/task-list.service";

@Component({
  selector: 'task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.less']
})
export class TaskListItemComponent implements OnInit,OnChanges,OnDestroy {

  constructor(private TaskListService:TaskListService) { }
  
	@Input() item:TaskItem;
	@Input() path:String;
	@Input() edit:Boolean = false;
	
	newItem: TaskItem = {
		name: ''
		,completed: false
	};
	showNewItem:Boolean = false;
	subitems$:Observable<any>;
	subitems:Array<TaskItem>;
	
	ngOnInit() {
		this.loadSubItems();
	}
	ngOnChanges(changes:SimpleChanges) {
		//console.log('task-list-item data changed',changes);
	}
	ngOnDestroy() { }
	
	editItem() {
		this.edit = true;
	}
	getItemPath() {
		let path = this.path + '/items';
		if (this.item.$key) path += '/' + this.item.$key;
		return path;
	}
	
	loadSubItems() {
		this.subitems$ = this.TaskListService.getItems(this.getItemPath());
		this.subitems$.subscribe(data => this.subitems = data);
	}
	
	onEditCancel() {
		//console.log('onEditCancel in task-list-item');
		this.edit = false;
	}
	onEditSave() {
		//console.log('onEditSave in task-list-item');
		this.edit = true;
	}
	onNewItemCancel() {
		this.showNewItem = false;
	}
	onNewItemSave() {
		// TODO: Add a user control to toggle the default of this behaviour
		this.showNewItem = true;
	}
	
	showNewItemForm() {
		this.showNewItem = true;
	}
}
