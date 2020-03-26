import { Injectable } from "@angular/core";
import * as fromApp from "../../app.reducer";
import { Store } from "@ngrx/store";
import * as SeatActions from "./store/seat.actions";
import { Seat } from "./seat.model";
import { FlightService } from "../flight/flight.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SeatService {
  seat: Seat;
  constructor(
    private store: Store<fromApp.appState>,
    private flightService: FlightService
  ) {
    
  }

  selectSeat(seat: Seat, i) {
    this.seat = seat;
    // this.store.dispatch(
    // new SeatActions.SelectSeat({
    // seat: seat.seatno,
    //color: "white",
    //index: i
    //})
    //);
  }
  getSelectedSeat() {
    return this.seat;
  }
}
