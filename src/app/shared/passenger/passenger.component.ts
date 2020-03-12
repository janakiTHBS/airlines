import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import * as FlightActions from '../flight/store/flight.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Flight } from '../flight/flight.model';
import { Passenger } from './passenger.model';
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit,OnDestroy {
flightId:number;
passengerId:number;
editmode:boolean=false;
passenger:Passenger;
flight:Flight;
  services:string[]=[];
  constructor(private store:Store<fromApp.appState>,
    private route:ActivatedRoute,
    private router:Router) { }


  passengerForm:FormGroup;
  ngOnInit(): void {
     this.route.params.subscribe(params=>{
       this.flightId=params['id'];
     });

     this.route.queryParams.subscribe(queryParams=>{
       this.passengerId=queryParams['pid'];
       this.editmode=queryParams['pid']!=null;
     });

     console.log(this.passengerId);
  
  
    this.store.select('flights').pipe(map(flightState=>{
      console.log(flightState.flights);
      return flightState.flights;
      
    })).subscribe(flights=>{
    this.flight=flights.find((flight,index)=>{
      return this.flightId==index;
    });
    });
    console.log(this.flight);

   this.formInit();
  }

 private formInit(){
   let pname=" ";
   let service='';
   let seatNumber='';

   if(this.editmode){
  
    this.passenger=this.flight.passengers.find((passenger,index)=>{
     
      return this.passengerId==index+1;
    })
   
    pname=this.passenger.name;

    if(this.flight.services){
     service= this.flight.services.find((service,index)=>{
        return index==0;
      })
    }
    seatNumber=this.passenger.seatNumber; 
  
   }

   this.passengerForm=new FormGroup({
    name:new FormControl(pname),
    service:new FormControl(service['service']),
    seatNumber:new FormControl(seatNumber)
   });


  }

  onSubmit(){
    console.log(this.passengerForm.value);
    console.log(this.flightId);
this.store.dispatch(new FlightActions.AddPassenger({index:this.flightId,passenger:this.passengerForm.value}));
  
this.passengerForm.reset();
this.router.navigate(['flights',this.flightId])
  }

  ngOnDestroy(){
    this.passengerForm.reset();
  }
}
