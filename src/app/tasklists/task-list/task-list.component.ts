import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TaskItem } from '../../global/_models/task-item.model';
import { TaskList } from '../../global/_models/task-list.model';
import {TaskListService} from "../../global/_services/task-list.service";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit,OnChanges,OnDestroy {
	constructor(private TaskListService:TaskListService) { }
	
	@Input() list: TaskList;
	editMode: Boolean = false;
	menuOpen: Boolean = false;
	tasklist$: any;
	tasklist: TaskList;
	listItems$: Observable<any>;
	listItems: Array<TaskItem>;
	listMembers:any;
	newItem: TaskItem = {
		name: ''
		,completed: false
	};
	showNewItem:Boolean = false;
	
	ngOnInit() {
		this.loadList();
		this.loadItems();
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
	
	closeMenu() {
		if (this.menuOpen) this.menuOpen = false;
	}
		
	deleteList() {
		console.warn('firing deleteList');
		this.closeMenu();
		
		let listId:string = this.tasklist.$key;
		
		console.log('listId',listId);
		
		this.listMembers = this.TaskListService.getListRights('list2user',listId);
		this.listMembers.subscribe(data => this.deleteListForUsers(data,listId));
		
		
		console.warn('TODO: delete list needs to be set up');
	}
	deleteListForUsers(members,listId) {
		console.log('firing deleteListForUsers',members);
		
		this.tasklist$.remove();
		
		for (let key in members) {
			console.log('clear for ',key);
			
			
			this.TaskListService.getListRights('user2list',listId,key).remove();
		}
		
		this.listMembers.remove();
	}
	
	editList() {
		this.closeMenu();
		this.editMode = true;
	}
	
	loadItems() {
		this.listItems$ = this.TaskListService.getItems(this.list.$key);
		this.listItems$.subscribe(data => this.listItems = data)
	}
	
	loadList() {
		this.tasklist$ = this.TaskListService.getTasklist(this.list.$key);
		this.tasklist$.subscribe(data => this.tasklist = data);
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
	
	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}
}
