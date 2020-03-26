import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as UserActions from "./user.actions";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}
  @Effect()
  userSignup = this.actions$.pipe(
    ofType(UserActions.SIGNUP),
    switchMap((signUpActions: UserActions.Signup) => {
      console.log("userEffects called");
      console.log(signUpActions);
      return this.http.post(
        "https://emailauth-8b81c.firebaseio.com/users.json",
        signUpActions.payload
      );
    })
  );
}
