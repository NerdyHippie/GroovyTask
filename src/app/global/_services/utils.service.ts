import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
	
	constructor() { }
	
	cleanObj(input:Object) {
		let invalidProps = ['$key','$exists'];
		for (let prop of invalidProps) {
			delete input[prop];
		}
		return input;
		
		/*
		 let ret = {};
		 let invalidProps = ['$key','$exists'];
		 for (let prop in input) {
		 if (invalidProps.indexOf(prop) == -1 && input.hasOwnProperty(prop)) {
		 ret[prop] = input[prop];
		 }
		 }
		 return ret;
		
		*/
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
