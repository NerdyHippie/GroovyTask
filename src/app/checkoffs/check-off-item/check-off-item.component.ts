import {Component,Input,OnInit} from '@angular/core';
import {CheckOffItem} from "../../global/_models/check-off-item.model";
import {CheckOffService} from "../../global/_services/check-off.service";
import * as moment from "moment";

@Component({
  selector: 'check-off-item',
  templateUrl: './check-off-item.component.html',
  styleUrls: ['./check-off-item.component.less']
})
export class CheckOffItemComponent implements OnInit {
	@Input() item: CheckOffItem;
	checking: boolean = false;
	checked: boolean = false;
	
	constructor(private CheckOffService:CheckOffService) { }

  ngOnInit() {}
  
  doCheckOff() {
		this.checking = true;
		let obj = {
			parentId: this.item.$key,
			name: this.item.name,
			completedDate: moment().format(),
		};
		this.CheckOffService.getDayList().push(obj).then((savedData:any) => {
			this.checking = false;
			this.checked = true;
			setTimeout(() => {this.checked = false;},1250);
			//console.log('savedData',savedData);
		});
  }

}
