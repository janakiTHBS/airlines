import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import * as FlightActions from '../flight/store/flight.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Flight } from '../flight/flight.model';
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
flightId:number;
flight:Flight;
  services:string[]=[];
  constructor(private store:Store<fromApp.appState>,
    private route:ActivatedRoute,
    private router:Router) { }


  passengerForm:FormGroup;
  ngOnInit(): void {
     this.route.params.subscribe(params=>{
       this.flightId=params['id'];
     })
    this.passengerForm=new FormGroup({
     name:new FormControl(null),
     service:new FormControl(null),
     seatNumber:new FormControl(null)
    });
    this.store.select('flights').pipe(map(flightState=>{
      console.log(flightState.flights);
      return flightState.flights;
      
    })).subscribe(flights=>{
    this.flight=flights.find((flight,index)=>{
      return this.flightId==index;
    });
    });
    console.log(this.flight.services);
  }


  onSubmit(){
    console.log(this.passengerForm.value);
    console.log(this.flightId);
this.store.dispatch(new FlightActions.AddPassenger({index:this.flightId,passenger:this.passengerForm.value}));
  
this.passengerForm.reset();
this.router.navigate(['flights',this.flightId])
  }
}
