import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showComplete'
})
export class ShowCompletePipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	let retItems:Array<any> = [];
  	for (let item of value) {
  		if ((!item.completed)|| (args == 'reverse' && item.completed)) {
  			retItems.push(item);
		  }
	  }
  	return retItems;
  }

}
