import { Injectable } from "@angular/core";
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Logger } from './logger.service'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {UserService} from "./user.service";

@Injectable()
export class TaskListService {
	tasklists$: FirebaseListObservable<any>;
	currentUser: any;
	
	constructor(private af: AngularFire,private UserService:UserService,private logger:Logger) {
		this.initialize();
	}
	
	private initialize():void {
		this.tasklists$ = this.af.database.list('/tasklists');
		this.UserService.currentUser.subscribe((data:any) => this.currentUser = data);
	}
	
	public getItem(path:String):any {
		return this.af.database.object('/tasklists/' + path);
	}
	public getItems(path:String):any {
		return this.af.database.list('/tasklists/' + path + '/items');
	}
	
	public getListRights(type:String,listId:String,userId:String) {
		switch(type) {
			case "list2user":
				return this.af.database.object('/listRights/list2user/'+listId+'/'+userId);
			case "user2list":
				return this.af.database.object('/listRights/user2list/'+userId+'/'+listId);
		}
		
	}
	
	public getListsForUser(userId:String):any {
		//console.log('getMyLists()',this.currentUser);
		return this.af.database.list('/listRights/user2list/'+userId);
	}
	
	public getTasklists():any {
		let path = '/tasklists';
		return this.af.database.list(path);
	}
	public getTasklist(listId:String):any {
		let path = '/tasklists/'+listId;
		return this.af.database.object(path);
	}
		
	
	public scrubData(input) {
		for (let key in input) {
			if (input.hasOwnProperty(key) && key.substr(0,1) != '$') {
				if (input[key] == '') {
					input[key] = null;
				}
			}
		}
		return input;
	}
}
