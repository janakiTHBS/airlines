import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private store: Store<fromApp.appState>,
    private _firebaseAuth: AngularFireAuth,
    private router: Router
  ) {}
  tokenExpirationTimer: any;

  setLogoutTimer(experirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.LogOut());
    }, experirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
