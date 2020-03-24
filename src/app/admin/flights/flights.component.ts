import { Component, OnInit, Output, ViewChild } from "@angular/core";
import { Flight } from "src/app/shared/flight/flight.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import { map, findIndex } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { Passenger } from "src/app/shared/passenger/passenger.model";
import { Subject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { PassengerComponent } from "src/app/shared/passenger/passenger.component";
import { FlightService } from "src/app/shared/flight/flight.service";
import { PassengerService } from "src/app/shared/passenger/passenger.service";
@Component({
  selector: "app-flights",
  templateUrl: "./flights.component.html",
  styleUrls: ["./flights.component.css"]
})
export class FlightsComponent implements OnInit {
  flightId: number;
  flights: Flight[];
  flight: Flight;
  listPassenger: MatTableDataSource<any>;
  listFlight: MatTableDataSource<Flight>;
  searchKey: string;
  services:string;

  displayPassengerColumns: string[] = [
    "name",
    "passport",
    "service",
    "seat",
    "action"
  ];
  displayFlightColumns: string[] = ["Operator"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private store: Store<fromApp.appState>,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private dialog: MatDialog,
    private passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightId = params["id"];
      this.flightService.setFlightId(this.flightId);
    });
    this.fetchFlights();
    console.log(this.flightId);

    this.listPassenger = new MatTableDataSource(this.flight.passengers);
    this.listFlight = new MatTableDataSource([this.flight]);
    // this.listPassenger = new MatTableDataSource(
    // this.passengerService.getPassengers(this.flight.id)
    //);

    console.log(this.listPassenger);
    this.listPassenger.sort = this.sort;
    this.listPassenger.paginator = this.paginator;
    this.listPassenger.filterPredicate = (data, filter) => {
      return this.displayPassengerColumns.some(ele => {
        return ele != "action";
        //&& data[ele].toLowerCase().indexOf(filter) != -1;
      });
    };
  }

  private fetchFlights() {
    this.store
      .select("flights")
      .pipe(
        map(flightState => {
          return flightState.flights;
        })
      )
      .subscribe(flights => {
        this.flights = flights;
      });
    this.flight = this.flights[this.flightId];
    this.services=this.flight.services.toString()
    console.log(this.flight);
  }
  onAddServices() {
    this.router.navigate(["flights", this.flightId, "service"]);
  }

  onEditPassenger(passenger: Passenger) {
    console.log(passenger);
    this.passengerService.populateForm(passenger, this.flightId);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.position = {
      left: "10px"
    };
    //this.dialog.open(PassengerComponent, dialogConfig);
    this.router.navigate(["flights", this.flightId, "passenger"]);
  }

  onAddPassenger() {
    //this.flightService.setFlight(this.flight);
    //const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    //dialogConfig.width = "60%";
    //this.dialog.open(PassengerComponent, dialogConfig);
    this.router.navigate(["flights", this.flightId, "passenger"]);
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.listPassenger.filter = this.searchKey.trim().toLowerCase();
  }
}
