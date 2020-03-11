import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/shared/flight/flight.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flightId:number;
  flights:Flight[];
  flight:Flight;
  constructor(private store:Store<fromApp.appState>,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
     this.flightId=params['id'];
    })
    this.store.select('flights').pipe(map(flightState=>{
      return flightState.flights;
    })).subscribe(flights=>{
      this.flights=flights;
    })
   this.flight=this.flights[this.flightId];
    console.log(this.flight);
  }

 onAddServices(){
   
  this.router.navigate(['flights',this.flightId,'service'])
   
 }
  
 onEditPassenger(){
   this.router.navigate(['flights',this.flightId,'passenger'])
 }

 onAddPassenger(){
  
  this.router.navigate(['flights',this.flightId,'passenger'])
  }
}
