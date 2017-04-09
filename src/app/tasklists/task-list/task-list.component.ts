import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TaskItem } from '../../global/_models/task-item.model';
import { TaskList } from '../../global/_models/task-list.model';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit,OnChanges,OnDestroy {
	constructor() { }
	
	@Input() list: Observable<any>;
	editMode: Boolean = false;
	showNewItem:Boolean = false;
	newItem: TaskItem = {
		name: ''
		,completed: false
	};
	listBackup: any;
	
	ngOnInit() {
	}
	ngOnChanges(changes:SimpleChanges) {
		//console.log('task-list data changed',changes);
	}
	ngOnDestroy() { }
	
	cancelNewItem() {
		//console.log('cancelNewItem from task-list')
		this.showNewItem = false;
		this.newItem = {
			name: ''
			,completed: false
		};
	}
	
	editList() {
		this.editMode = true;
		this.listBackup = Object.assign({},this.list)
	}
	
	onCancelListEdit() {
		this.editMode = false;
	}
	
	onListSave() {
		this.editMode = false;
	}
	
	showNewItemForm() {
		this.showNewItem = true;
	}
	
}
