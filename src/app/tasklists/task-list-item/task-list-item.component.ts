import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.less']
})
export class TaskListItemComponent implements OnInit,OnChanges,OnDestroy {

  constructor() { }
  
	@Input() item:Observable<any>;
	
	@Input() edit:Boolean = false;
	
	ngOnInit() {
	}
	ngOnChanges(changes:SimpleChanges) {
		//console.log('task-list-item data changed',changes);
	}
	ngOnDestroy() { }
	
	editItem() {
		this.edit = true;
	}
	cancelEdit() {
		//console.log('cancelEdit in task-list-item');
		this.edit = false;
	}
}
