import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { take,map } from 'rxjs/operators';
@Injectable({
    providedIn:'root',
})

export class AuthGuard implements CanActivate {
    constructor(private store:Store<fromApp.appState>,private routerR:Router){}
    canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean | UrlTree |Promise<boolean|UrlTree> | Observable<boolean|UrlTree>{
        return this.store.select('auth').pipe(take(1),map((authState)=>{
        return authState.user;
        }),map(user=>{
            console.log(user);
            const isAuth=!!user;
            console.log(isAuth);
            if(isAuth){
        
                if(user.role==="ADMIN"){

                }
                return true;
            }

            this.routerR.createUrlTree(['/auth']);
        }));

    }}
