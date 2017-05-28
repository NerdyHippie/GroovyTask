import { Injectable } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { Logger } from "./logger.service";
import * as firebase from 'firebase';
import 'rxjs/add/operator/map'
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthenticationService {
		auth:any;  // Store the AngularFire auth in a service variable so that we can use it in components, etc.
		loggedIn:Boolean = null;
	
		constructor(
			private afAuth:AngularFireAuth,
			private router:Router,
			private activatedRoute: ActivatedRoute,
			private usrSvc:UserService,
			private alertService:AlertService,
			private logger:Logger
		) {
    	this.auth = afAuth.authState;
    	
			afAuth.authState.subscribe((authData) => {
				this.logger.log('authData in authenticationService',authData);
				if (authData) {
					this.loggedIn = true;
					this.handleAuthSuccess(authData);
				} else {
					if (window.location.pathname !== '/emailAction') {
						this.loggedIn = false;
						logger.log('nav to logout');
						let returnUrl:string = this.router.routerState.snapshot.url;
						this.router.navigate(['/logout'], { queryParams: { returnUrl: returnUrl }});
					}
				}
			})
    };
	
		loginWithEmail(username:string,password:string) {
			return this.afAuth.auth.signInWithEmailAndPassword(username,password);
		}
		
		loginWithFacebook() {
			return this.signInWithPopup(new firebase.auth.FacebookAuthProvider());
		}
		loginWithGoogle() {
			return this.signInWithPopup(new firebase.auth.GoogleAuthProvider());
		}
		loginWithTwitter() {
			return this.signInWithPopup(new firebase.auth.TwitterAuthProvider());
		}
		loginWithGithub() {
			return this.signInWithPopup(new firebase.auth.GithubAuthProvider());
		}
		
		handleAuthSuccess(authData:any) {
			this.logger.log('firing handleAuthSuccess',authData);
			
			this.usrSvc.setUserAccount(authData);
			this.usrSvc.loadCurrentUser(authData);
		}
		
		logout() {
			this.afAuth.auth.signOut();
			return this.afAuth.authState;
		}
	
		requestReset(email:string): any{
			return firebase.auth().sendPasswordResetEmail(email);
		}
		signInWithPopup(provider) {
			return this.afAuth.auth.signInWithPopup(provider);
		}
}
