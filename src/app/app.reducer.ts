import { ActionReducerMap } from "@ngrx/store";
import * as AuthReducer from "./shared/auth/store/auth.reducer";
import * as FlightReducer from "./shared/flight/store/flight.reducer";
import * as PassengerReducer from "./shared/passenger/store/passenger.reducer";
import * as UserReducer from "./shared/auth2/store/user.reducer";
import * as SeatReducer from "./shared/seat-map/store/seat.reducer";
export interface appState {
  auth: AuthReducer.State;
  flights: FlightReducer.State;
  passengers: PassengerReducer.State;
  users: UserReducer.State;
  seats: SeatReducer.State;
}
export const appReducer: ActionReducerMap<appState> = {
  auth: AuthReducer.AuthReducer,
  flights: FlightReducer.FlightState,
  passengers: PassengerReducer.PassengerState,
  users: UserReducer.UserState,
  seats: SeatReducer.SeatState
};
