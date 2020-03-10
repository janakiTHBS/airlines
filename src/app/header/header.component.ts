import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../shared/auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
userSub:Subscription;
  isAuthenticated=false;
  constructor(private store:Store<fromApp.appState>) { }

  ngOnInit(): void {
    this.userSub=this.store.select('auth').pipe(map(authState=>{
      return authState.user;
  })).subscribe(user=>{
  this.isAuthenticated =!user ? false:true;
 
  });
  }

  onLogout(){
    this.store.dispatch(new AuthActions.LogOut())
  }
}
