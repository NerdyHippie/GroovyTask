import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LocationService {
	isTracking: boolean = false;
	location:BehaviorSubject<any> = new BehaviorSubject(false);
	locInterval:any;
	logInterval:any;
	positionLog:any;
	positionLog$:any = this.db.list('/locLog');
	trackLog:any;
	trackLog$:any = this.db.list('/trackLog');
	
  constructor(private db:AngularFireDatabase) {
  	this.initialize();
  }

  private initialize() {
  	console.log('initialize LocationService');
    if (navigator.geolocation) {
	    this.setPosition();
    } else {
      this.location.next(false);
    }
  }
  
  public getPosition() {
  	return this.location.getValue();
  }
  
  public loadPositionLog() {
  	this.positionLog$.subscribe(data => this.positionLog = data);
  }
  public logPosition() {
    this.positionLog$.push(this.makePositionObj());
  }
  
	public makePositionObj() {
		let ret = {};
		let pos = this.getPosition();
		if (pos) {
			for (let key in pos) {
				ret[key] = pos[key];
			}
		}
		return ret;
	}
	
	public setPosition() {
	  navigator.geolocation.getCurrentPosition(position => {
	  	this.location.next(position.coords);
		  console.log('your location is lat: %o long: %o',position.coords.latitude,position.coords.longitude);
	  });
  }
	
	public startTrackingPosition() {
		console.log('startTracking');
		this.isTracking = true;
  	this.locInterval = setInterval(this.setPosition.bind(this),5000);
  	/*this.logInterval = setInterval(() => {
  	  this.logPosition();
	  },5000)*/
  	
  }
	
  public stopTrackingPosition() {
  	console.log('stopTracking');
  	this.isTracking = false;
	  clearInterval(this.locInterval);
	  //clearInterval(this.logInterval);
  }
}
