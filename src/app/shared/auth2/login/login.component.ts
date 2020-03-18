import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    public ngZone: NgZone,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signInWithTwitter() {
    this.authService
      .signInWithTwitter()
      .then(res => {
        this.ngZone.run(() => this.router.navigate(["admin"]));
      })
      .catch(err => console.log(err));
  }

  signInWithFacebook() {
    this.authService
      .signInWithFacebook()
      .then(res => {
        this.ngZone.run(() => this.router.navigate(["admin"]));
      })
      .catch(err => console.log(err));
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(res => {
        this.ngZone.run(() => this.router.navigate(["admin"]));
      })
      .catch(err => console.log(err));
  }
}
