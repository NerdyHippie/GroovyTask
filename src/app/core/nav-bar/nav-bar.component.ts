import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from '../../global/_services/authentication.service';

import { UserService } from '../../global/_services/user.service';
import { User } from "../../global/_models/user.model";

@Component({
    moduleId:    module.id,
    selector:    'nav-bar',
    templateUrl: './nav-bar.component.html'
	,styleUrls: ['nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
		public loggedIn:Boolean = false;
		public isCollapsed:Boolean = true;
		public currentUser:User = null;
	
    constructor(private authSvc: AuthenticationService,private userService:UserService, private afAuth:AngularFireAuth, private router: Router) { }

    ngOnInit() {
    	this.afAuth.authState.subscribe(auth => this.loggedIn = auth ? true : false);
			this.userService.currentUser.subscribe((data:User) => this.currentUser = data);
   	}
    
   	getProfileLink() {
    	return this.currentUser ? this.currentUser.uid : '';
		}
   	
    toggleCollapse() {
    	this.isCollapsed = !this.isCollapsed;
		}
  
		collapseNav() {
    	this.isCollapsed = true;
		}
		
		logout() {
			let returnUrl:string = this.router.routerState.snapshot.url;
			
			this.router.navigate(['/logout'], { queryParams: { returnUrl: returnUrl }});
			this.collapseNav();
		}
}
