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
passengerId:string;
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
  
  this.fecthFlights();
   

   this.formInit();
  }

  private fecthFlights(){

    this.store.select('flights').pipe(map(flightState=>{
      console.log(flightState.flights);
      return flightState.flights;
      
    })).subscribe(flights=>{
    this.flight=flights.find((flight,index)=>{
      return this.flightId==index;
    });
    });
    console.log(this.flight);

    return this.flight;
    
  }
 private formInit(){
   let id="";
   let pname=" ";
   let service='';
   let seatNumber='';

   if(this.editmode){
  
    this.passenger=this.flight.passengers.find((passenger,index)=>{
     
      return passenger.id===this.passengerId;
    })
   
    console.log(this.passenger);
    id=this.passenger.id;
    pname=this.passenger.name;


    if(this.flight.services){
     service= this.flight.services.find((service,index)=>{
        return index==0;
      })
    }
    seatNumber=this.passenger.seatNumber; 
  
   }

   this.passengerForm=new FormGroup({
    id:new FormControl(id),
    name:new FormControl(pname),
    service:new FormControl(service['service']),
    seatNumber:new FormControl(seatNumber)
   });


  }

  onSubmit(){
    console.log(this.passengerForm.value);
    console.log(this.flightId);
    if(this.editmode){
      console.log(this.flight)
      this.store.dispatch(new FlightActions.UpdatePassenger({fid:this.flightId,pid:this.passengerId,passenger:this.passengerForm.value}))
    }
    else {
      this.store.dispatch(new FlightActions.AddPassenger({index:this.flightId,passenger:this.passengerForm.value}));
    }

  
this.passengerForm.reset();
this.router.navigate(['flights',this.flightId])
  }

  ngOnDestroy(){
    this.passengerForm.reset();
  }
}
