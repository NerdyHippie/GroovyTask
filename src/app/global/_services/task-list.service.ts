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
	
	public getTasklists():any {
		let path = '/tasklists';
		return this.af.database.list(path);
	}
	public getTasklist(listId:String):any {
		let path = '/tasklists/'+listId;
		return this.af.database.object(path);
	}
		
	public getItem(path:String):any {
		return this.af.database.object('/tasklists/' + path);
	}
	public getItems(path:String):any {
		return this.af.database.list('/tasklists/' + path + '/items');
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
