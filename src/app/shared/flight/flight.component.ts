import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Passenger } from '../passenger/passenger.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Flight } from './flight.model';
import { map } from 'rxjs/operators';
import * as PassengerActions from '../passenger/store/passenger.actions';
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  @ViewChild('id') public id:ElementRef;
  passenger:Passenger;
  loaded=false;
  constructor(private store :Store<fromApp.appState>,
    private router:Router) { }
   flight:Flight;
  ngOnInit(): void {
    console.log('Flight component')
    this.store.select('flights').pipe(map(FlightState=>{
      console.log(FlightState.flights.slice().sort((a:any,b:any)=>a.timeOfDeparture-b.timeOfDeparture));
     return FlightState.flights.slice()
     .sort((a:any,b:any)=>a.timeOfDeparture-b.timeOfDeparture).find((flight,index)=>{
       return flight.timeOfDeparture >= new Date();
     })
    })).subscribe(flight=>{
      const arrival=flight.timeOfDeparture;
    
      this.flight=flight;
     
    })
  }
  onSearch(){
    console.log(this.id.nativeElement.value);
    this.store.dispatch(new PassengerActions.FetchPassenger(this.id.nativeElement.value-1));
    this.loaded=true;
    this.store.select('passengers').pipe(map(passengerState=>{
      return passengerState.passenger;
    })).subscribe(passenger=>{
       this.passenger=passenger;
    })
  }

onChange(){
  this.router.navigate(['/seat']);
}

}
