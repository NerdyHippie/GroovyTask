import {Component,Input,OnInit} from '@angular/core';
import * as moment from "moment";
import {CheckOffItem} from "../../global/_models/check-off-item.model";
import {CheckOffService} from "../../global/_services/check-off.service";
import {HistoryItem} from "../../global/_models/history-item";

@Component({
  selector: 'check-off-history-item',
  templateUrl: './check-off-history-item.component.html',
  styleUrls: ['./check-off-history-item.component.less']
})
export class CheckOffHistoryItemComponent implements OnInit {
	@Input() item: HistoryItem;
	parentInfo: CheckOffItem;
	
  constructor(private CheckOffService:CheckOffService) { }

  ngOnInit() {
  	if (!this.item.name) {
		  this.getParentInfo();
	  }
  }
	getCompletedDate() {
  	return moment(this.item.completedDate).format("dddd, MMMM Do YYYY, h:mm a");
	}
	getItemName() {
		return this.item.name || this.parentInfo.name;
	}
  getParentInfo() {
  	console.log('getParentInfo',this.item.parentId);
    this.CheckOffService.getItem(this.item.parentId).subscribe((data:any) => {
    	this.parentInfo = data;
    	console.log('data',data);
    });
  }

}
