// Vendor modules
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule,EditorModule,SharedModule} from 'primeng/primeng';
import 'hammerjs'
import {DragulaModule} from "ng2-dragula";

// App Routing
import { AppRouting,AppRoutingComponents } from './app.routing';
import { AuthGuard } from './global/_guards/index';

// Project Modules
import { AdminModule } from './admin/admin.module';
import { GlobalModule } from './global/global.module';
import { TestModule } from './test/test.module';

// Components
import { AppComponent }  from './app.component';
import { NavBarComponent }  from './core/nav-bar/nav-bar.component';
import { TaskListManagerComponent } from './tasklists/task-list-manager.component';
import { TaskListComponent } from './tasklists/task-list/task-list.component';
import { TaskListItemComponent } from './tasklists/task-list-item/task-list-item.component';

// Global Services
import { AlertService,AuthenticationService,Logger,TaskListService,UserService,UtilService } from './global/_services/index';

// Pipes
import { ShowCompletePipe } from './global/_pipes/index'

// Environment
import { environment } from '../environments/environment';
import { TaskListItemEditorComponent } from './tasklists/task-list-item-editor/task-list-item-editor.component';
import { TaskListEditorComponent } from './tasklists/task-list-editor/task-list-editor.component';


// Concatenate Components here for readability
export const CoreComponents: Array<any> = [NavBarComponent];
export const PrimeModules: Array<any> = [CalendarModule,EditorModule,GlobalModule];


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule.forRoot()
    ,PrimeModules
    ,AppRouting
    ,AdminModule
    ,GlobalModule
	  ,TestModule
	  ,DragulaModule
  ],
  declarations: [
    AppComponent,
    CoreComponents,
    AppRoutingComponents,
    TaskListComponent,
    TaskListManagerComponent,
    TaskListItemComponent,
    TaskListItemEditorComponent,
    TaskListEditorComponent
  ],
  
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    Logger,
	  TaskListService,
    UserService,
    UtilService,
	  ShowCompletePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
