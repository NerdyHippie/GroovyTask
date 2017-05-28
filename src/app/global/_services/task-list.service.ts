import { Injectable } from "@angular/core";
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { Logger } from './logger.service'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {UserService} from "./user.service";

@Injectable()
export class TaskListService {
	tasklists$: FirebaseListObservable<any>;
	currentUser: any;
	
	constructor(private db: AngularFireDatabase,private UserService:UserService,private logger:Logger) {
		this.initialize();
	}
	
	private initialize():void {
		this.tasklists$ = this.db.list('/tasklists');
		this.UserService.currentUser.subscribe((data:any) => this.currentUser = data);
	}
	
	public getItem(path:string):any {
		return this.db.object('/tasklists/' + path);
	}
	public getItems(path:string):any {
		return this.db.list('/tasklists/' + path + '/items');
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
		
		return this.db.object(path);
	}
	
	public getListsForUser(userId:String):any {
		//console.log('getMyLists()',this.currentUser);
		return this.db.list('/listRights/user2list/'+userId);
	}
	
	public getTasklists():any {
		let path = '/tasklists';
		return this.db.list(path);
	}
	public getTasklist(listId:string):any {
		let path = '/tasklists/'+listId;
		return this.db.object(path);
	}
	
	
	
}
