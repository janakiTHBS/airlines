import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as FlightActions from '../../shared/flight/store/flight.actions';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
flightId:number;
  constructor(private route:ActivatedRoute,
    private store:Store<fromApp.appState>,
    private router:Router) { }
  serviceForm:FormGroup;
  ngOnInit(): void {
    this.serviceForm=new FormGroup({
      service:new FormControl(null)
    });
this.route.params.subscribe(params=>{
  this.flightId=params['id'];
})

  }

  onSubmit(){
 const service=this.serviceForm.get('service').value;
    this.store.dispatch(new FlightActions.AddService({service:service,index:this.flightId}));
    this.router.navigate(['flights',this.flightId])
  }
}
