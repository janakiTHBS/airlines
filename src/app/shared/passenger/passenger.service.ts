import { Injectable, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FlightService } from "../flight/flight.service";
import { Flight } from "../flight/flight.model";
import * as fromApp from "../../app.reducer";
import { Store } from "@ngrx/store";
import * as flightActions from "../flight/store/flight.actions";
import { Passenger } from "./passenger.model";
import { map } from "rxjs/operators";
import { SeatService } from "../seat-map/seat.service";
import { Seat } from '../seat-map/seat.model';
import * as SeatActions from '../seat-map/store/seat.actions';

@Injectable({
  providedIn: "root"
})
export class PassengerService implements OnInit {
  seats:Seat[];
  checkInPassenger:Passenger;
  flight: Flight;
  passengerList;
  flightid;
  constructor(
    private flightService: FlightService,
    private store: Store<fromApp.appState>,
    private seatService: SeatService
  ) {
    this.store
      .select("seats")
      .pipe(
        map(seatState => {
          return seatState.seats;
        })
      )
      .subscribe(seats => {
        this.seats = seats;
      });
  }

  passengerForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl(null),
    name: new FormControl(null),
    service: new FormControl(["wheel chair"])
    //seatNumber: new FormControl(null)
  });

  ngOnInit() {

   // this.flight = this.flightService.getUpdatedFlight();
    //console.log(this.flight);
  }

  initializeFormGroup() {
    this.passengerForm.setValue({
      $key: null,
      id: "",
      name: "",
      service: ""
      //seatNumber: ""
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
    const pass = new Passenger(
      passenger.id,
      passenger.name,
      this.seatService.getSelectedSeat(),
      passenger.service
    );
    console.log(pass);
    this.store.dispatch(
      new flightActions.AddPassenger({
        index: +this.flight.id,
        passenger: pass
      })
    );
  }

  updatePassenger(fid, pid, passenger) {
    const updatePassenger=new Passenger(
      passenger.id,
      passenger.name,
      this.seatService.getSelectedSeat(),
      passenger.service
    )
    console.log(updatePassenger);
    this.store.dispatch(
      new flightActions.UpdatePassenger({
        fid: fid,
        pid: pid,
        passenger: updatePassenger
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
      service: editFlight.services
      //seatNumber: passenger.seatNumber
    });
  }

  selectPassengerForCheckin(passenger:Passenger,flightid){
    this.checkInPassenger=passenger;
    this.flightid=flightid;
  }

  getPassengerForCheckin(){
    return this.checkInPassenger;
  }
  getCheckinFlight(){
    return this.flightid;
  }

  changeSeatColor(flight){
    flight.passengers.forEach(passenger => {
      console.log(passenger.service.trim().toLowerCase() === "infants");
      console.log(passenger.service.trim().toLowerCase() === "wheelchair");
      if (passenger.service.trim().toLowerCase() === "infants") {
        console.log(passenger.seatNumber);
        this.store.dispatch(
          new SeatActions.SelectSeat({
            seat: passenger.seatNumber!==null ? passenger.seatNumber.seatno : null,
            color: passenger.seatNumber!==null? "orange":"blue",
            index: this.seats.indexOf(passenger.seatNumber)
          })
        );
      } else if (passenger.service.trim().toLowerCase() === "wheelchair") {
        this.store.dispatch(
          new SeatActions.SelectSeat({
            seat: passenger.seatNumber.seatno,
            color: "yellow",
            index: this.seats.indexOf(passenger.seatNumber) + 1
          })
        );
      } else {
        this.store.dispatch(
          new SeatActions.SelectSeat({
            seat: passenger.seatNumber.seatno,
            color: "red",
            index: this.seats.indexOf(passenger.seatNumber)
          })
        );
      }
    });
  }
}
