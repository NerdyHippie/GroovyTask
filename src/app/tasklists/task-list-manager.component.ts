import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../global/_services/task-list.service'
import {TaskList} from "../global/_models/task-list.model";
import {Logger} from "../global/_services/logger.service";
import {UserService} from "../global/_services/user.service";

@Component({
  selector: 'task-list-manager',
  templateUrl: 'task-list-manager.component.html',
  styleUrls: ['task-list-manager.component.less']
})
export class TaskListManagerComponent implements OnInit {
	
	/*tasklists: Array<any>;
	tasklists$: any;*/
	myLists$: any;
	myLists: Array<TaskList>;
	newListFormVisible: Boolean = false;
	newTasklist: TaskList = {
		name: ''
		,archived: false
	};
	
  constructor(private TaskListService:TaskListService,private UserService:UserService,private logger:Logger) { }

  ngOnInit() {
  	//this.tasklists$ = this.TaskListService.tasklists$.subscribe(this.bindLists.bind(this));
  	this.UserService.currentUser.subscribe(usrData => this.loadMyLists(usrData));
  }

  /*bindLists(data) {
	  this.logger.log('binding tasklists',data);
  	this.tasklists = data;
  }*/
  
  loadMyLists(userData) {
  	console.log('loading list data for user',userData);
	  this.myLists$ = this.TaskListService.getListsForUser(userData.uid);
	  this.myLists$.subscribe(data => {
		  console.log('myLists$',data);
		  this.myLists = data
	  });
  }
  
	ngOnDestroy() {
		//this.tasklists$.unsubscribe();
		this.myLists$.unsubscribe();
	}
	
	onNewListCancel() {
  	this.newListFormVisible = false;
  	this.newTasklist = {
  		name: ''
		  ,archived: false
	  }
	}
	
	onNewListSave() {
  	this.onNewListCancel();
	}
  
	showNewListForm() {
  	this.newListFormVisible = true;
	}
	
}
