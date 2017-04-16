import {Component,EventEmitter,Input,OnInit,Output} from '@angular/core';
import {Observable} from "rxjs";
import {TaskList} from "../../global/_models/task-list.model";
import {Task} from "protractor/built/taskScheduler";
import {TaskListService} from "../../global/_services/task-list.service";
import {Logger} from "../../global/_services/logger.service";
import {UserService} from "../../global/_services/user.service";
import {User} from "../../global/_models/user.model";


@Component({
  selector: 'task-list-editor',
  templateUrl: './task-list-editor.component.html',
  styleUrls: ['./task-list-editor.component.less']
})
export class TaskListEditorComponent implements OnInit {

  constructor(private TaskListService:TaskListService,private UserService:UserService,private Logger:Logger) { }
  
  @Input() list: TaskList;
	@Output() onCancel: EventEmitter<any> = new EventEmitter();
	@Output() onSave: EventEmitter<any> = new EventEmitter();
	
  originalData: TaskList;
  currUser: User;
	errorData: any = {};
	rightsSet: any = {};
	//listRights:any;
	
  ngOnInit() {
  	this.originalData = Object.assign({},this.list);
  	delete this.originalData.items;
  	
	  this.UserService.currentUser.subscribe(usr => this.currUser = usr);
	
	  this.Logger.log('Initialized task-list-editor with list data',this.list)
  }
	cancelEdit() {
		//console.log('cancelEdit from task-list-editor');
		this.onCancel.emit();
		for (let key in this.originalData) {
			this.list[key] = this.originalData[key];
		}
	}
	
	checkSetRights(right:string) {
  	this.rightsSet[right] = true;
  	
  	if (this.rightsSet.list2user && this.rightsSet.user2list) {
  		this.rightsSet = {};
  		this.onSave.emit();
	  }
	}
	
	createList() {
		console.log('create new list!');
  	let listList = this.TaskListService.getTasklists();
  	let listAdd = listList.push(this.list);
  	
  	listAdd.then(this.setNewListPermissions.bind(this)).catch(this.handleListAddFail.bind(this));
  	
		
	}
	
	handleListAddFail(errorData) {
		console.error('list add failed');
		console.log('reject response = ',errorData);
	}
	
	handlePermissionFail(errorData) {
		console.error('list permission set failed');
		console.log('reject response = ',errorData);
	}
	
	save() {
  	console.log('save list',this.list);
		this.list = this.TaskListService.scrubData(this.list);
		this.list.$key ? this.updateList() : this.createList();
	}
	
	scrubListData() {
  	for (let key in this.list) {
  		if (this.list.hasOwnProperty(key) && key.substr(0,1) != '$') {
  			if (this.list[key] == '') {
  				this.list[key] = null;
			  }
		  }
	  }
	}
	
	setNewListPermissions(newListData) {
  	
  	console.log('newListData',newListData.key);
  	console.log('currentUser',this.currUser);
		
		
		this.TaskListService.getListRights('list2user',newListData.key,this.currUser.uid).set("owner").then(data => this.checkSetRights('list2user'));
		this.TaskListService.getListRights('user2list',newListData.key,this.currUser.uid).set("owner").then(data => this.checkSetRights('user2list'));
		
		//console.log('direct update',listRights);
		/*listRights.update(permissions)
			.then(data =>
				this.onSave.emit())
			.catch(error =>
				this.handlePermissionFail(error));*/
		
		
	}
	
	updateList() {
		console.log('update list');
  	let listToUpdate = this.TaskListService.getTasklist(this.list.$key);
  	listToUpdate.update(this.list);
		this.onSave.emit();
 	}
	
	validate() {
  	let isValid:Boolean = true;
  	this.errorData = {};
  	
  	return isValid;
	}
}
