import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../global/_services/task-list.service'
import {TaskList} from "../global/_models/task-list.model";
import {Logger} from "../global/_services/logger.service";

@Component({
  selector: 'task-list-manager',
  templateUrl: 'task-list-manager.component.html',
  styleUrls: ['task-list-manager.component.less']
})
export class TaskListManagerComponent implements OnInit {
	
	tasklists: Array<any>;
	tasklists$: any;
	newListFormVisible: Boolean = false;
	newTasklist: TaskList = {
		name: ''
		,archived: false
	};
	
  constructor(private ts:TaskListService,private logger:Logger) { }

  ngOnInit() {
  	this.tasklists$ = this.ts.tasklists$.subscribe(this.bindLists.bind(this));
  }

  bindLists(data) {
	  this.logger.log('binding tasklists',data);
  	this.tasklists = data;
  }
	ngOnDestroy() {
		this.tasklists$.unsubscribe();
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
