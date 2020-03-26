import { Component, OnInit, ElementRef, ViewChild, Output } from "@angular/core";
import { Passenger } from "../passenger/passenger.model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import { Flight } from "./flight.model";
import { map } from "rxjs/operators";
import * as PassengerActions from "../passenger/store/passenger.actions";
import { MatTableDataSource } from "@angular/material/table";
import { PassengerService } from '../passenger/passenger.service';
import { SeatService } from '../seat-map/seat.service';
import * as flightActions from "../flight/store/flight.actions";
import { FlightService } from './flight.service';
import { SeatMapComponent } from '../seat-map/seat-map.component';
import { Subject } from 'rxjs';
@Component({
  selector: "app-flight",
  templateUrl: "./flight.component.html",
  styleUrls: ["./flight.component.css"]
})
export class FlightComponent implements OnInit {
  @ViewChild("id") public id: ElementRef;
  passenger: Passenger;
  passengerlist: MatTableDataSource<Passenger>;
  loaded = false;
  selectedSeat:String;
  seatMapEnable:boolean;
  flights;

  displayPassengerColumns: string[] = [
    "name",
    "passport",
    "service",
    "seat",
    "action"
  ];
  constructor(private store: Store<fromApp.appState>, 
    private router: Router,
    private dialog: MatDialog,
    private passengerService:PassengerService,
    private flightService:FlightService,
    private route:ActivatedRoute,
    private seatService:SeatService) {
      
    }
  flight: Flight;
  ngOnInit(): void {
    console.log("Flight component");

    this.store.select('flights').pipe(map(flightstate=>{
      return flightstate.flights;
    })).subscribe(flights=>{
     this.flights=flights;
    });

    this.store
      .select("flights")
      .pipe(
        map(FlightState => {
          console.log(
            FlightState.flights
              .slice()
              .sort((a: any, b: any) => a.timeOfDeparture - b.timeOfDeparture)
          );

          return FlightState.flights
            .slice()
            .sort((a: any, b: any) => a.timeOfDeparture - b.timeOfDeparture)
            .find((flight, index) => {
              return flight.timeOfDeparture >= new Date();
            });
        })
      )
      .subscribe(flight => {
        console.log(this.flight===null);
        const arrival = flight.timeOfDeparture;
          this.flight = flight;
        console.log(this.flight)
      });
    this.flights.sort((a:any,b:any)=>a.timeOfDeparture-b.timeOfDeparture);
    
    this.passengerlist = new MatTableDataSource(this.flight.passengers);
  }

  selectFlight(flight){
    console.log(flight)
    this.flight=flight;
    this.passengerlist=new MatTableDataSource(flight.passengers);
  }
  onSearch() {
    console.log(this.id.nativeElement.value);
    this.store.dispatch(
      new PassengerActions.FetchPassenger(this.id.nativeElement.value - 1)
    );
    this.loaded = true;
    this.store
      .select("passengers")
      .pipe(
        map(passengerState => {
          return passengerState.passenger;
        })
      )
      .subscribe(passenger => {
        this.passenger = passenger;
      });
  }

  onChange() {
    this.router.navigate(["/seat"]);
  }

  onEditPassenger(passenger) {
    console.log(passenger);
  }

  selectSeat(passenger:Passenger){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    //sthis.psgr.next(passenger);
    //this.dialog.open(SeatMapComponent, dialogConfig);
    //this.passengerService.updatePassenger(this.flight.id,passenger.id,passenger)
    //this.seatMapEnable=true;
    console.log(passenger);
    this.passengerService.selectPassengerForCheckin(passenger,this.flight.id);
    this.router.navigate(['/select-seat'])
    //this.passengerService.populateForm(passenger,this.flight.id);
    //this.router.navigate(["flights", this.flight.id, "passenger"]);
  }
  saveToDB(){
    this.flightService.saveFlights();
  }
}
