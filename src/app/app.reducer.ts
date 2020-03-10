import { ActionReducerMap } from '@ngrx/store';
import * as AuthReducer from './shared/auth/store/auth.reducer';
import * as FlightReducer from './shared/flight/store/flight.reducer';
import * as PassengerReducer from './shared/passenger/store/passenger.reducer';
export interface appState {
auth:AuthReducer.State,
flights:FlightReducer.State,
passengers:PassengerReducer.State
}
export const appReducer:ActionReducerMap<appState>= {
    auth:AuthReducer.AuthReducer,
    flights:FlightReducer.FlightState,
    passengers:PassengerReducer.PassengerState
}