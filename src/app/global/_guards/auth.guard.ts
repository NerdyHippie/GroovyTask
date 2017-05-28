import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthGuard implements CanActivate {
		
    constructor(private router: Router,private afAuth: AngularFireAuth) {	}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.afAuth.authState.map((auth) => {
					if (!auth) {
						let queryParams:any= {};
						if (state.url != '/') {
							queryParams.returnUrl = state.url
						}
						this.router.navigate(['/login'], { queryParams: queryParams});
						return false;
					}
					return true;
				}).take(1);
    }
}
