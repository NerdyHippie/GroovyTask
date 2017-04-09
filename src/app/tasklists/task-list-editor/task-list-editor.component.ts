import {Component,EventEmitter,Input,OnInit,Output} from '@angular/core';
import {Observable} from "rxjs";
import {TaskList} from "../../global/_models/task-list.model";
import {Task} from "protractor/built/taskScheduler";
import {TaskListService} from "../../global/_services/task-list.service";
import {Logger} from "../../global/_services/logger.service";


@Component({
  selector: 'task-list-editor',
  templateUrl: './task-list-editor.component.html',
  styleUrls: ['./task-list-editor.component.less']
})
export class TaskListEditorComponent implements OnInit {

  constructor(private TaskListService:TaskListService,private Logger:Logger) { }
  
  @Input() list: TaskList;
	@Output() onCancel: EventEmitter<any> = new EventEmitter();
	@Output() onSave: EventEmitter<any> = new EventEmitter();
  originalData: TaskList;

  ngOnInit() {
  	this.originalData = Object.assign({},this.list);
  	delete this.originalData.items;
  	this.Logger.log('Initialized task-list-editor with list data',this.list)
  }
	cancelEdit() {
		//console.log('cancelEdit from task-list-editor');
		this.onCancel.emit();
		for (let key in this.originalData) {
			this.list[key] = this.originalData[key];
		}
	}
	
	createList() {
		console.log('create new list!');
  	let listList = this.TaskListService.getTasklists();
  	listList.push(this.list);
  	
		this.onSave.emit();
		
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
	
	updateList() {
		console.log('update list');
  	let listToUpdate = this.TaskListService.getTasklist(this.list.$key);
  	listToUpdate.update(this.list);
		this.onSave.emit();
 	}
	
	
}
