import * as SeatActions from "./seat.actions";
import { Seat } from "../seat.model";
export interface State {
  seats: Seat[];
}

const initialState: State = {
  seats: [
    new Seat("1A", "blue"),
    new Seat("1B", "blue"),
    new Seat("1C", "blue"),
    new Seat("1D", "blue"),
    new Seat("1E", "blue"),
    new Seat("1F", "blue"),
    new Seat("2A", "blue"),
    new Seat("2B", "blue"),
    new Seat("2C", "blue"),
    new Seat("2D", "blue"),
    new Seat("2E", "blue"),
    new Seat("2F", "blue"),
    new Seat("3A", "blue"),
    new Seat("3B", "blue"),
    new Seat("3C", "blue"),
    new Seat("3D", "blue"),
    new Seat("3E", "blue"),
    new Seat("3F", "blue"),
    new Seat("4A", "blue"),
    new Seat("4B", "blue"),
    new Seat("4C", "blue"),
    new Seat("4D", "blue"),
    new Seat("4E", "blue"),
    new Seat("4F", "blue")
  ]
};

export function SeatState(
  state = initialState,
  action: SeatActions.SeatActions
) {
  switch (action.type) {
    case SeatActions.SELECT_SEAT:
      const selectedSeat = state.seats[action.payload.index];
      const updatedSeat = {
        ...selectedSeat,
        color: action.payload.color
      };
      const updatedSeats = [...state.seats];
      updatedSeats[action.payload.index] = updatedSeat;
      return {
        ...state,
        seats: updatedSeats
      };
    default:
      return {
        ...state
      };
  }
}
