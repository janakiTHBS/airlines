import { Action } from "@ngrx/store";
import { User } from "../user.model";
export const SIGNUP = "SIGNUP";

export class Signup implements Action {
  readonly type = SIGNUP;
  constructor(public payload: User) {}
}

export type UserActions = Signup;
