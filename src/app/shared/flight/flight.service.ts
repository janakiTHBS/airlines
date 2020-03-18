import { Injectable } from "@angular/core";
import { Flight } from "./flight.model";
import * as fromApp from "../../app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class FlightService {
  flightId: number;
  updatedFlight: Flight;
  constructor(
    private store: Store<fromApp.appState>,
    private route: ActivatedRoute
  ) {}

  setFlightId(id) {
    console.log(id);
    this.flightId = id;
  }
  getUpdatedFlight() {
    this.store
      .select("flights")
      .pipe(
        map(flightState => {
          return flightState.flights;
        })
      )
      .subscribe(flights => {
        this.updatedFlight = flights.find((flight, index) => {
          console.log(flight);
          console.log(this.flightId == index);
          return this.flightId == index;
        });
      });
    console.log(this.updatedFlight);
    return this.updatedFlight;
  }
}
