import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as FlightActions from './flight.actions';
import { switchMap, map } from 'rxjs/operators';
import { FlightService } from '../flight.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import { Flight } from '../flight.model';

@Injectable()
export class FlightEffects {

    flights:Flight[];

    constructor(private actions$:Actions,private http:HttpClient,private flightService:FlightService){  
    }

    
}