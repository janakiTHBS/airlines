import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { map } from 'rxjs/operators';
import { Flight } from '../shared/flight/flight.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  flights:Flight[];
  
  constructor(private store:Store<fromApp.appState>,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.store.select('flights').pipe(map(flightState=>{
      return flightState.flights;
    })).subscribe(flights=>{
      this.flights=flights;
      console.log(flights);
    })
    
  }



onAddPassengers(index:number){

}

displayPassengers(index:number) {
this.flights[index];
this.router.navigate(['/flights',index])
}
}
