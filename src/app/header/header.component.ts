import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";
import { map } from "rxjs/operators";
import * as AuthActions from "../shared/auth/store/auth.actions";
import { AuthService } from "../shared/auth2/auth.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userSub: Subscription;
  username: string;
  isAuthenticated = false;
  isLoggedIn: boolean;
  constructor(
    private store: Store<fromApp.appState>,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select("auth")
      .pipe(
        map(authState => {
          return authState.user;
        })
      )
      .subscribe(user => {
        if (user) {
          this.username = user.email.split("@")[0];
        }

        this.isAuthenticated = !user ? false : true;
      });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.LogOut());
  }
}
