import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { Logger } from './logger.service'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {UserService} from "./user.service";
import {AngularFireDatabase,FirebaseListObservable} from "angularfire2/database";


@Injectable()
export class CheckOffService {
	myItems$: FirebaseListObservable<any>;
	currentUser: any;
	
	constructor(private db:AngularFireDatabase,private UserService:UserService,private logger:Logger) {
		this.initialize();
	}
	
	private initialize():void {
		this.UserService.currentUser.subscribe((data:any) => {
			//console.log('currUserData',data);
			this.currentUser = data;
		});
	}
	
	public getDayList(params?) {
		if (!params) params = {};
		
		params.userId = params.userId || this.currentUser.uid;
		
		let queryPkg:any = {
			orderByChild: 'completedDate'
		};
		
		if (params.forDate) {
			queryPkg.startAt = moment(params.forDate).clone().hour(0).minute(0).format();
			queryPkg.endAt = moment(params.forDate).clone().hour(23).minute(59).format()
		} else {
			queryPkg.startAt = moment().subtract(24,'hour').format();
		}
		
		return this.db.list('/checkOffs/checkedItems/' + params.userId ,{query: queryPkg})
	}
	
	public getItem(itemId:string,userId?:string):any {
		userId = userId || this.currentUser.uid;
		return this.db.object('/checkOffs/userItems/' + userId + '/' + itemId);
	}
	
	public getItemsForUser(userId?:string):any {
		userId = userId || this.currentUser.uid;
		//console.log('getMyLists()',this.currentUser);
		return this.db.list('/checkOffs/userItems/'+userId);
	}
}
