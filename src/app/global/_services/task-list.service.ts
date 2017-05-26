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
	
	public getItem(path:string):any {
		return this.af.database.object('/tasklists/' + path);
	}
	public getItems(path:string):any {
		return this.af.database.list('/tasklists/' + path + '/items');
	}
	
	public getListRights(type:string,listId:string,userId?:String) {
		let path:string = '/listRights/' + type + '/';
		
		switch(type) {
			case "list2user":
				path += listId;
				if (userId) {
					path += '/' + userId;
				}
				break;
			case "user2list":
				path += userId + '/' + listId;
				break;
		}
		
		return this.af.database.object(path);
	}
	
	public getListsForUser(userId:String):any {
		//console.log('getMyLists()',this.currentUser);
		return this.af.database.list('/listRights/user2list/'+userId);
	}
	
	public getTasklists():any {
		let path = '/tasklists';
		return this.af.database.list(path);
	}
	public getTasklist(listId:string):any {
		let path = '/tasklists/'+listId;
		return this.af.database.object(path);
	}
	
	
	
}
