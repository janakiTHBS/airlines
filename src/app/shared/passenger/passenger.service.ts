import { Injectable, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FlightService } from "../flight/flight.service";
import { Flight } from "../flight/flight.model";
import * as fromApp from "../../app.reducer";
import { Store } from "@ngrx/store";
import * as flightActions from "../flight/store/flight.actions";
import { Passenger } from "./passenger.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PassengerService implements OnInit {
  flight: Flight;
  passengerList;
  constructor(
    private flightService: FlightService,
    private store: Store<fromApp.appState>
  ) {}

  passengerForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl(null),
    name: new FormControl(null),
    service: new FormControl(["wheel chair"]),
    seatNumber: new FormControl(null)
  });

  ngOnInit() {
    this.flight = this.flightService.getUpdatedFlight();
    console.log(this.flight);
  }

  initializeFormGroup() {
    this.passengerForm.setValue({
      $key: null,
      id: "",
      name: "",
      service: "",
      seatNumber: ""
    });
  }
  getPassengers() {
    let passengers: Passenger[] = this.flightService.getUpdatedFlight()
      .passengers;
    this.passengerList = Object.assign({}, ...passengers);
    console.log(this.passengerList);
    return passengers;
  }

  insertPassenger(passenger) {
    console.log(passenger);
    this.store.dispatch(
      new flightActions.AddPassenger({
        index: +this.flight.id,
        passenger: passenger
      })
    );
  }

  updatePassenger(fid, pid, passenger) {
    this.store.dispatch(
      new flightActions.UpdatePassenger({
        fid: fid,
        pid: pid,
        passenger: passenger
      })
    );
  }
  populateForm(passenger, fid) {
    let editFlight: Flight;
    this.store
      .select("flights")
      .pipe(
        map(flightState => {
          return flightState.flights;
        })
      )
      .subscribe(flights => {
        editFlight = flights.find((flight, index) => {
          return flight.id === fid;
        });
      });
    let service = null;
    console.log(editFlight);
    if (editFlight.services) {
      console.log(editFlight.services);
      service = editFlight.services.find((service, index) => {
        console.log(service);
        console.log(passenger.service);
        return service == passenger.service;
      });
      console.log(service);
    }
    this.passengerForm.setValue({
      $key: "update",
      id: passenger.id,
      name: passenger.name,
      service: editFlight.services,
      seatNumber: passenger.seatNumber
    });
  }
}
