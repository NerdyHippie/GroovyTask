import { Component, OnInit } from '@angular/core';
import {CheckOffService} from "../../global/_services/check-off.service";
import {CheckOffItem} from "../../global/_models/check-off-item.model";
import {UserService} from "../../global/_services/user.service";
import {ReversePipe} from "../../global/_pipes/reverse.pipe";
import * as moment from "moment";

@Component({
  selector: 'check-off-history',
  templateUrl: './check-off-history.component.html',
  styleUrls: ['./check-off-history.component.less']
})
export class CheckOffHistoryComponent implements OnInit {
	historyItems: Array<CheckOffItem>;
	selectedDate: any;
	
  constructor(private CheckOffService:CheckOffService,private UserService:UserService) { }

  ngOnInit() {
	 //this.loadHistory();
	 this.loadHistory();
  }

  loadHistory(loadDate?) {
  	this.UserService.currentUser.subscribe((usrData:any) => {
  		let dayPkg = {
  			userId: usrData.uid,
			  forDate: loadDate
  		};
  		
		  this.CheckOffService.getDayList(dayPkg).subscribe((data:any) => {
			  this.historyItems = data;
		  })
	  })
	  
  }
}
