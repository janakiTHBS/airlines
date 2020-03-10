import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { map } from 'rxjs/operators';
import { Flight } from '../shared/flight/flight.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  flights:Flight[];

  constructor(private store:Store<fromApp.appState>) { }

  ngOnInit(): void {
    this.store.select('flights').pipe(map(flightState=>{
      return flightState.flights;
    })).subscribe(flights=>{
      this.flights=flights;
      console.log(flights);
    })
    
  }

onAddPassengers(index:number){
 console.log(this.flights[index]);
}
}
