import {Component,HostListener,OnDestroy,OnInit} from '@angular/core';
import {LocationService} from "../global/_services/location.service";
import * as moment from 'moment';

@Component({
  selector: 'locations-home',
  templateUrl: './locations-home.component.html',
  styleUrls: ['./locations-home.component.less']
})
export class LocationsHomeComponent implements OnInit,OnDestroy {
	@HostListener('window:beforeunload') confirmUnload() {
		return confirm('Are you sure you want to go back?');
	}
	
	currentPosition: any = {};
	formData: any = {};
	locLog: any;
	isTracking: boolean;
	pendingAdds:Array<any> = [];
	savedPoints:Array<any>;
	
  constructor(private LocationService: LocationService) { }

  ngOnInit() {
  	this.isTracking = this.LocationService.isTracking;
  	this.LocationService.location.subscribe(data => this.currentPosition = data);
  	this.LocationService.startTrackingPosition();
    this.LocationService.positionLog$.subscribe(data => this.savedPoints = data);
  }
  
  ngOnDestroy() {
  	this.LocationService.stopTrackingPosition();
  }
  
  addLocation() {
  	let posPkg = Object.assign({},this.formData);
  	posPkg.location = this.LocationService.makePositionObj();
  	posPkg.timestamp = moment().format();
  	
  	this.pendingAdds.push(this.formData.name);
  	
    this.LocationService.positionLog$.push(posPkg).then(data => {
    	console.log('add success',data);
    	this.pendingAdds.splice(this.pendingAdds.indexOf(posPkg.name),1);
    });
	
	  this.resetForm();
  }
  resetForm() {
	  this.formData = {};
  }

}
