import { Injectable } from "@angular/core";
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Logger } from './logger.service'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class TaskListService {
	tasklists$: FirebaseListObservable<any>;
	
	
	constructor(private af: AngularFire,private logger:Logger) {
		this.initialize();
	}
	
	private initialize():void {
		this.tasklists$ = this.af.database.list('/tasklists');
	}
	
	getTasklists():any {
		let path = '/tasklists';
		return this.af.database.list(path);
	}
	
	getTasklist(listId:String):any {
		let path = '/tasklists/'+listId;
		return this.af.database.object(path);
	}
		
}
