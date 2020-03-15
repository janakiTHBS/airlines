import { Injectable } from "@angular/core";
import { Flight } from "./flight.model";
import * as fromApp from "../../app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FlightService {
  flight: Flight;
  updatedFlight: Flight;
  constructor(private store: Store<fromApp.appState>) {}

  setFlight(flight: Flight) {
    console.log(flight);
    this.flight = flight;
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
          console.log(this.flight);
          return this.flight == flight;
        });
      });
    console.log(this.updatedFlight);
    return this.updatedFlight;
  }
}
