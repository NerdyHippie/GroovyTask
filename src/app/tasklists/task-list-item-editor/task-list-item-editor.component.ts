import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Observable} from "rxjs";
import {TaskItem} from "../../global/_models/task-item.model";
import {TaskListService} from "../../global/_services/task-list.service";

@Component({
  selector: 'task-list-item-editor',
  templateUrl: './task-list-item-editor.component.html',
  styleUrls: ['./task-list-item-editor.component.less']
})
export class TaskListItemEditorComponent implements OnInit {

  constructor(private TaskListService:TaskListService) { }
	
	@Input() item:TaskItem;
  @Input() path: String;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  

  ngOnInit() {
  }
  
  cancelEdit() {
  	//console.log('cancelEdit from task-list-item-editor');
  	this.onCancel.emit();
  }

  createItem() {
		console.log('Create Item');
	  let itemList = this.TaskListService.getItems(this.path);
	  itemList.push(this.item);
		this.onSave.emit();
  }
  
  save() {
  	console.log('Firing Save for ',this.item);
  	this.item = this.TaskListService.scrubData(this.item);
  	this.item.$key ? this.updateItem() : this.createItem();
  }
  
  updateItem() {
		console.log('Update Item');
	  let itemToSave = this.TaskListService.getItem(this.path);
	  itemToSave.update(this.item);
	  this.onSave.emit();
  }
  
}
