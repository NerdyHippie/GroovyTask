import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MdCoreModule,MdButtonModule,MdCardModule,MdRadioModule,MdCheckboxModule,MdTooltipModule,MdSliderModule,MdButtonToggleModule,MdGridListModule
	,MdInputModule,MdListModule,MdMenuModule,MdProgressBarModule,MdSidenavModule,MdSlideToggleModule,MdTabsModule, MdToolbarModule,MdIconModule, MdIconRegistry } from '@angular/material';

import { TestRouting,TestRouteComponents } from './test.routing';


@NgModule({
  imports: [
    CommonModule,
	  BrowserModule,
	  FormsModule,
	  HttpModule,
	  TestRouting,
	  MdButtonModule,
	  MdButtonToggleModule,
	  MdCardModule,
	  MdCheckboxModule,
	  MdCoreModule,
	  MdGridListModule,
	  MdIconModule,
	  MdInputModule,
	  MdListModule,
	  MdMenuModule,
	  MdProgressBarModule,
	  MdRadioModule,
	  MdSidenavModule,
	  MdSliderModule,
	  MdSlideToggleModule,
	  MdTabsModule,
	  MdToolbarModule,
	  MdTooltipModule
  ],
  declarations: [TestRouteComponents]
})
export class TestModule {
	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
	}
}
