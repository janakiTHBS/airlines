import { Passenger } from "../passenger.model";

import * as PassengerActions from "./passenger.actions";
import { Seat } from "../../seat-map/seat.model";

export interface State {
  passengers: Passenger[];
  passenger: Passenger;
}

const initialState: State = {
  passengers: [
    new Passenger("1", "Janaki", new Seat("1B", "red"), "infants"),
    new Passenger("2", "Lavanya", new Seat("1C", "blue"), "wheel chair"),
    new Passenger("3", "Sukumar", new Seat("1D", "blue")),
    new Passenger("4", "Nishvi", new Seat("3D", "blue"))
  ],
  passenger: null
};
export function PassengerState(
  state = initialState,
  action: PassengerActions.PassengerActions
) {
  switch (action.type) {
    case PassengerActions.FETCH_PASSENGERS:
      return {
        ...state
      };
    case PassengerActions.FETCH_PASSENGER:
      const passenger = state.passengers[action.payload];
      console.log(passenger);
      return {
        ...state,
        passenger: passenger
      };
    default:
      return state;
  }
}
