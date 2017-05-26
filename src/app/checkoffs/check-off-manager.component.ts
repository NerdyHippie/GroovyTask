import { Component, OnInit } from '@angular/core';
import {CheckOffItem} from "../global/_models/check-off-item.model";
import {UserService} from "../global/_services/user.service";
import {Logger} from "../global/_services/logger.service";
import {CheckOffService} from "../global/_services/check-off.service";
import {SortPipe} from "../global/_pipes/sort.pipe";


@Component({
  selector: 'app-check-off-manager',
  templateUrl: './check-off-manager.component.html',
  styleUrls: ['./check-off-manager.component.less']
})
export class CheckOffManagerComponent implements OnInit {
	
	myItems$: any;
	myItems: Array<CheckOffItem>;
	newItem: CheckOffItem = {
		name: '',
		archived: false
	};
	
  constructor(private CheckOffService:CheckOffService,private UserService:UserService,private logger:Logger) { }

  ngOnInit() {
	  this.UserService.currentUser.subscribe(usrData => this.loadMyItems(usrData));
  }
	
	byName(a,b) {
  	return a.name > b.name ? 1 : -1
	}
 
	loadMyItems(userData) {
		// console.log('loading item data for user',userData);
		this.myItems$ = this.CheckOffService.getItemsForUser(userData.uid);
		this.myItems$.subscribe(data => {
			//console.log('myItems',data);
			this.myItems = data;
		});
	}
	
	ngOnDestroy() {
		//this.tasklists$.unsubscribe();
		this.myItems$.unsubscribe();
	}
	
	onNewItemCancel() {
		this.newItem = {
			name: '',
			archived: false
		}
	}
	
	onNewItemSave() {
		this.onNewItemCancel();
	}
}
