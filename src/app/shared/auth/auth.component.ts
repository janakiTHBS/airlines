import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  storeSub: Subscription;
  constructor(
    private store: Store<fromApp.appState>,
    private authService: AuthService,
    private router: Router,
    public ngZone: NgZone
  ) {}

  userForm: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
    this.store.select("auth").subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    console.log(this.userForm.value);

    if (!this.userForm.valid) {
      return null;
    }
    //this.isLoginMode=true;
    console.log(this.isLoginMode);
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart(this.userForm.value));
    } else {
      this.store.dispatch(new AuthActions.Signup(this.userForm.value));
    }
    this.isLoading = false;
    this.userForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(res => {
        console.log(res);
        this.ngZone.run(() => this.router.navigate(["admin"]));
      })
      .catch(err => console.log(err));
  }
}
