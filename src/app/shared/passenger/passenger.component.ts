import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { Store } from "@ngrx/store";
import { MatDialogRef } from "@angular/material/dialog";
import * as fromApp from "../../app.reducer";
import * as FlightActions from "../flight/store/flight.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Flight } from "../flight/flight.model";
import { Passenger } from "./passenger.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FlightService } from "../flight/flight.service";
import { PassengerService } from "./passenger.service";
import { NotificationService } from "../notification.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SeatMapComponent } from "../seat-map/seat-map.component";
import { SeatService } from "../seat-map/seat.service";
import { Seat } from "../seat-map/seat.model";
import * as SeatActions from "../../shared/seat-map/store/seat.actions";

@Component({
  selector: "app-passenger",
  templateUrl: "./passenger.component.html",
  styleUrls: ["./passenger.component.css"]
})
export class PassengerComponent implements OnInit, OnDestroy {
  seatno: string;
  flightId: number;
  passengerId: string;
  editmode: boolean = false;
  passenger: Passenger;
  updateFlight: Flight;
  updatedFlight: Flight;
  services: string[] = [];
  seats: Seat[];
  constructor(
    private store: Store<fromApp.appState>,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    //private dialogRef: MatDialogRef<PassengerComponent>,
    public passengerService: PassengerService,
    private notificationService: NotificationService,
    //private dialog: MatDialog,
    private seatService: SeatService
  ) {}

  //passengerForm: FormGroup;
  ngOnInit(): void {
    console.log("passenger nginit called...");
    //this.seatno = this.seatService.getSelectedSeat();
    //console.log(this.seatno);
    //this.route.params.subscribe(params => {
    // this.flightId = params["id"];
    //console.log(this.flightId);
    //});
    this.updatedFlight = this.flightService.getUpdatedFlight();
    this.passengerService.flight = this.updatedFlight;
    console.log(this.updatedFlight);
    this.route.queryParams.subscribe(queryParams => {
      this.passengerId = queryParams["pid"];
      this.editmode = queryParams["pid"] != null;
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.position = { right: "0px" };
    dialogConfig.panelClass = "custom-dialog-container";
    // this.dialog.open(SeatMapComponent, dialogConfig);
    this.router.navigate(["seats"], { relativeTo: this.route });

    //console.log(this.passengerId);

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
    //this.fecthFlights();

    // this.formInit();

    this.updatedFlight.passengers.forEach(passenger => {
      console.log(passenger.service.trim().toLowerCase() === "infants");
      console.log(passenger.service.trim().toLowerCase() === "wheelchair");
      if (passenger.service.trim().toLowerCase() === "infants") {
        console.log(passenger.seatNumber);
        this.store.dispatch(
          new SeatActions.SelectSeat({
            seat: passenger.seatNumber.seatno,
            color: "orange",
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

  ngOnDestroy() {}

  onSubmit() {
    console.log(this.passengerService.passengerForm.value);
    if (!this.passengerService.passengerForm.get("$key").value) {
      this.passengerService.insertPassenger(
        this.passengerService.passengerForm.value
      );
    } else {
      this.passengerService.updatePassenger(
        this.updatedFlight.id,
        this.passengerService.passengerForm.get("id").value,
        this.passengerService.passengerForm.value
      );
    }

    this.passengerService.passengerForm.reset();
    this.passengerService.initializeFormGroup();
    this.notificationService.success("::Submitted successfully");
    //this.dialogRef.close();

    this.router.navigate(["flights", this.updatedFlight.id]);
  }

  onClear() {
    this.passengerService.passengerForm.reset();
  }
  //private fecthFlights() {
  //this.store
  //.select("flights")
  //.pipe(
  //map(flightState => {
  //console.log(flightState.flights);
  //return flightState.flights;
  //})
  //)
  //.subscribe(flights => {
  //this.updatedFlight = flights.find((flight, index) => {
  //return this.updateFlight == flight;
  //});
  //});
  //console.log(this.updatedFlight);

  //return this.updatedFlight;
  //}

  /*private formInit() {
    let id = "";
    let pname = " ";
    let service = "";
    let seatNumber = "";

    if (this.editmode) {
      this.passenger = this.updatedFlight.passengers.find(
        (passenger, index) => {
          return passenger.id === this.passengerId;
        }
      );

      console.log(this.passenger);
      id = this.passenger.id;
      pname = this.passenger.name;

      if (this.updatedFlight.services) {
        service = this.updatedFlight.services.find((service, index) => {
          return index == 0;
        });
      }
      seatNumber = this.passenger.seatNumber;
    }

    this.passengerForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(pname),
      service: new FormControl(service["service"]),
      seatNumber: new FormControl(seatNumber)
    });
  }

  onSubmit() {
    console.log(this.passengerForm.value);
    if (this.editmode) {
      console.log(this.updatedFlight);
      this.store.dispatch(
        new FlightActions.UpdatePassenger({
          fid: +this.updatedFlight.id,
          pid: this.passengerId,
          passenger: this.passengerForm.value
        })
      );
    } else {
      this.store.dispatch(
        new FlightActions.AddPassenger({
          index: +this.updatedFlight.id,
          passenger: this.passengerForm.value
        })
      );
    }

    //this.router.navigate([
    //{ outlets: { flightlist: ["flights", this.updateFlight.id] } }
    //]);

    this.onClose();
  }

  onClose() {
    this.passengerForm.reset();
    this.dialogRef.close("Successfully Registered");
  }
  ngOnDestroy() {
    this.passengerForm.reset();
  }
  onClear() {}
  */

  OnRouteToSeatMap() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.position = { right: "0px" };
    dialogConfig.panelClass = "custom-dialog-container";
    // this.dialog.open(SeatMapComponent, dialogConfig);
    this.router.navigate(["seats"], { relativeTo: this.route });
  }

  seatSelected(value) {
    console.log(value);
  }
}
