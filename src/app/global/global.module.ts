import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AlertComponent,LoadingMessageComponent } from './_directives/index';
import { FilterByIdPipe } from "./_pipes/filter-by-id.pipe";
import { SexyChexyComponent } from './_directives/sexy-chexy/sexy-chexy.component';
import { ShowCompletePipe } from './_pipes/show-complete.pipe';
import { SortPipe } from './_pipes/sort.pipe';
import { ReversePipe } from './_pipes/reverse.pipe';

export const globalComponents: Array<any> = [AlertComponent,LoadingMessageComponent,FilterByIdPipe,ReversePipe,ShowCompletePipe,SexyChexyComponent,SortPipe];

@NgModule({
    imports:      [ CommonModule,FormsModule ],
    declarations: [
    	globalComponents
    ],
    exports:      [
        CommonModule, FormsModule, globalComponents ]
})
export class GlobalModule {
    constructor() {

    }
}
