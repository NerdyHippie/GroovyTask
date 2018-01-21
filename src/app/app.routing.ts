import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AuthGuard } from './global/_guards/auth.guard'

import { HomeComponent } from './core/home/home.component';
import { CalendarComponent } from './core/calendar/calendar.component';
import { LoginComponent } from './core/login/login.component';
import { LogoutComponent } from './core/logout/logout.component';
import { RegisterComponent } from './core/register/register.component';
import { ResetRequestComponent } from './core/reset-request/reset-request.component';
import { EmailActionComponent } from './core/email-action/email-action.component';
import { CheckOffManagerComponent } from './checkoffs/check-off-manager.component';
import { LocationsHomeComponent } from './locations/locations-home.component';
import {MapsHomeComponent} from "./maps/maps-home.component";
import { TaskListManagerComponent } from './tasklists/task-list-manager.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { UserEditorComponent } from './admin/user-editor/user-editor.component';

const appRoutes: Routes = [
	{
		path: ''
		,component: MapsHomeComponent
		,canActivate: [AuthGuard]
	},{
		path: 'home'
		,component: HomeComponent
		,canActivate: [AuthGuard]
	},{
		path: 'checkoffs'
		,component: CheckOffManagerComponent
		,canActivate: [AuthGuard]
	},{
		path: 'locations'
		,component: LocationsHomeComponent
		,canActivate: [AuthGuard]
	},{
		path: 'maps'
		,component: MapsHomeComponent
		,canActivate: [AuthGuard]
	},{
		path: 'tasklists'
		,component: TaskListManagerComponent
		,canActivate: [AuthGuard]
	},{
		path: 'calendar'
		,component: CalendarComponent
		,canActivate: [AuthGuard]
	},{
		path: 'profile/:id'
		,component: UserDetailComponent
		,canActivate: [AuthGuard]
	},{
		path: 'profile/edit/:id'
		,component: UserEditorComponent
		,canActivate: [AuthGuard]
	},{
		path: 'login'
		,component: LoginComponent
	},{
		path: 'logout'
		,component: LogoutComponent
	},{
		path: 'register'
		,component: RegisterComponent
	},{
		path: 'reset'
		,component: ResetRequestComponent
	},{
		path: 'emailAction'
		,component: EmailActionComponent
		,pathMatch: 'prefix'
	}
];

export const AppRoutingComponents = [HomeComponent,CalendarComponent,LoginComponent,LogoutComponent,RegisterComponent,ResetRequestComponent,EmailActionComponent,TaskListManagerComponent,CheckOffManagerComponent,LocationsHomeComponent];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
