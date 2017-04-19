import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AlertComponent,LoadingMessageComponent } from './_directives/index';
import { FilterByIdPipe } from "./_pipes/filter-by-id.pipe";
import { SexyChexyComponent } from './_directives/sexy-chexy/sexy-chexy.component';
import { ShowCompletePipe } from './_pipes/show-complete.pipe';

export const globalComponents: Array<any> = [AlertComponent,LoadingMessageComponent,FilterByIdPipe,ShowCompletePipe,SexyChexyComponent];

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
