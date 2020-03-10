import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store:Store<fromApp.appState>) { }
  tokenExpirationTimer:any;

  setLogoutTimer(experirationDuration:number){
    this.tokenExpirationTimer=setTimeout(()=>{
     this.store.dispatch(new AuthActions.LogOut());
     
    }, experirationDuration);

  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer=null;
    }
    }
}
