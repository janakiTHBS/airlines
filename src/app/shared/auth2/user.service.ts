import { Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  userForm: FormGroup = new FormGroup({
    UserName: new FormControl(null),
    Password: new FormControl(null),
    Email: new FormControl(null),
    FirstName: new FormControl(null),
    LastName: new FormControl(null)
  });

  addUser(user: User) {
    console.log(user);
    this.http
      .post("https://emailauth-8b81c.firebaseio.com/users.json", user)
      .subscribe(() => {
        console.log("Inserted successfully");
      });
  }
}
