import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Observable} from "rxjs";
import {TaskItem} from "../../global/_models/task-item.model";
import {TaskListService} from "../../global/_services/task-list.service";
import {TaskList} from "../../global/_models/task-list.model";
import {Logger} from "../../global/_services/logger.service";

@Component({
  selector: 'task-list-item-editor',
  templateUrl: './task-list-item-editor.component.html',
  styleUrls: ['./task-list-item-editor.component.less']
})
export class TaskListItemEditorComponent implements OnInit {

  constructor(private TaskListService:TaskListService,private Logger:Logger) { }
	
	@Input() item:TaskItem;
  @Input() path: String;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  
	originalData: TaskItem;
	errorData:any = {};
  

  ngOnInit() {
	  this.originalData = Object.assign({},this.item);
	  delete this.originalData.items;
	  this.Logger.log('Initialized task-list-item-editor with item data',this.item)
  }
  
  cancelEdit() {
  	//console.log('cancelEdit from task-list-item-editor');
	  for (let key in this.originalData) {
		  this.item[key] = this.originalData[key];
	  }
  	this.onCancel.emit();
  }

  createItem() {
		let itemList = this.TaskListService.getItems(this.path);
	  itemList.push(this.item);
		this.onSave.emit();
  }
   
  doSubmitError(error) {
  	this.errorData = {};
  	
  	switch(error.code) {
		  case "PERMISSION_DENIED":
		  	this.errorData.submitError = 'You do not have permission to update this list.';
		  	alert(this.errorData.submitError);
		  	//console.log('no dice');
		  	break;
	  }
  }
  
  doSubmitSuccess(data) {
 	  this.onSave.emit();
  }
  
  getPlaceholder() {
  	let ret:String = '';
  	if (this.item.$key) {
		  ret = 'Edit item';
	  } else {
  		let depth = (this.path.match(/items/g) || []).length;
  		//console.log('depth',depth);
  		if (depth > 0) {
			  ret = 'New subitem';
		  } else {
  			ret = 'New item';
		  }
	  }
	  
	  return ret;
  }
  
  save() {
  	console.log('Firing Save for ',this.item);
  	if (this.validate()) {
		  this.item = this.TaskListService.scrubData(this.item);
		  this.item.$key ? this.updateItem() : this.createItem();
	  }
  }
  
  updateItem() {
		let itemToSave = this.TaskListService.getItem(this.path);
	  let promise = itemToSave.update(this.item);
	  
	  promise
		  .then(data => this.doSubmitSuccess(data))
		  .catch(error => this.doSubmitError(error));
  }
  
  validate() {
  	let isValid:Boolean = true;
  	this.errorData = {};
  	if (!this.item.name || !this.item.name.length) {
  		isValid = false;
  		this.errorData.name = "Each item must have a name";
	  }
	  return isValid;
  }
  
}
