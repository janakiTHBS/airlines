import { User } from "../user.model";
import * as UserActions from "./user.actions";
export interface State {
  user: User;
}

const initialState = {
  user: null
};

export function UserState(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.SIGNUP:
      return {
        ...state
      };
  }
}
