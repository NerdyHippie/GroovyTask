import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(items: any, args?: any): any {
	  return items ? items.slice().reverse() : [];
  }

}
