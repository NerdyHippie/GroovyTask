import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'task-list-item-editor',
  templateUrl: './task-list-item-editor.component.html',
  styleUrls: ['./task-list-item-editor.component.less']
})
export class TaskListItemEditorComponent implements OnInit {

  constructor() { }
	
	@Input() item:Observable<any>;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  	
  }
  
  cancelEdit() {
  	//console.log('cancelEdit from task-list-item-editor');
  	this.onCancel.emit();
  }

  save() {
  	console.log(this.item);
  }
  
}
