import { Component, OnInit, Input } from '@angular/core';
import { PassengerService } from '../../passenger/passenger.service';
import { Passenger } from '../../passenger/passenger.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SeatService } from '../../seat-map/seat.service';
import * as FlightActions from '../store/flight.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../app/app.reducer';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Flight } from '../flight.model';
@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {
  passenger:Passenger;
  flight:Flight;
  flightid;
  constructor(private passengerService:PassengerService,
    private seatService:SeatService,
    private store:Store<fromApp.appState>,
    private router:Router) { }

  ngOnInit(): void {
    
    this.passenger=this.passengerService.getPassengerForCheckin();
    console.log(this.passenger);
    this.flightid=this.passengerService.getCheckinFlight();

    this.store.select('flights').pipe(map(flightstate=>{
      return flightstate.flights;
    })).subscribe(flights=>{
      console.log(this.flightid);
      this.flight=flights.find((flight,index)=>{
        console.log(flight.id);
        console.log(this.flightid===flight.id);
        return this.flightid===flight.id;
      })
      console.log(this.flight);
    })
    this.passengerService.changeSeatColor(this.flight);
  }

  onSubmit(){
    this.passenger.seatNumber=this.seatService.getSelectedSeat();
   
  this.store.dispatch(new FlightActions.UpdatePassenger({fid:this.flightid,pid:this.passenger.id,passenger:this.passenger}));
this.router.navigate(['/flight'])
  }
  onCheckIn(){
   
  }
}
