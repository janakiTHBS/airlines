import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";
import { map } from "rxjs/operators";
import { Flight } from "../shared/flight/flight.model";
import { Router, ActivatedRoute } from "@angular/router";
import { FlightService } from "../shared/flight/flight.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  flights: Flight[];
  listFlight: MatTableDataSource<Flight>;
  displayFlightColumns = [
    "Operator",
    "To",
    "From",
    "Departure time",
    "Arrival time"
  ];
  constructor(
    private store: Store<fromApp.appState>,
    private router: Router,
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.store
      .select("flights")
      .pipe(
        map(flightState => {
          return flightState.flights;
        })
      )
      .subscribe(flights => {
        this.flights = flights;
        this.listFlight = new MatTableDataSource(flights);
        console.log(flights);
      });
  }

  onAddPassengers(index: number) {}

  displayPassengers(index: number) {
    console.log(this.flights[index]);
    //this.flightService.setFlight(this.flights[index]);
    this.flights[index];
    this.router.navigate(["/flights", index]);
  }
}
