import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

import * as UserActions from "../store/user.actions";
import { User } from "../user.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../app.reducer";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  user: User;
  constructor(
    public userService: UserService,
    private store: Store<fromApp.appState>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.userService.userForm.value);

    //this.store.dispatch(
    //new UserActions.Signup(this.userService.userForm.value)
    //);
    this.userService.addUser(this.userService.userForm.value);
  }
}
