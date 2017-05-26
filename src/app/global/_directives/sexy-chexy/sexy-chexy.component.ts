import {Component,Output,EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-sexy-chexy',
  templateUrl: './sexy-chexy.component.html',
  styleUrls: ['./sexy-chexy.component.less'],
	providers: [
		{provide: NG_VALUE_ACCESSOR, useExisting: SexyChexyComponent, multi: true}
	]
})
export class SexyChexyComponent {
	@Output()
	dataChange: EventEmitter<any>;
	
	value: any;
	
  constructor() {
  	this.dataChange = new EventEmitter();
  }

  setValue(newVal) {
  	this.value = newVal;
  }
  
  wasChecked(state:any) {
    this.value = state;
    this.dataChange.emit(this.value);
  }

}
