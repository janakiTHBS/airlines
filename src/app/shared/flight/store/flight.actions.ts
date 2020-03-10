
import {Action} from '@ngrx/store';
import { Flight } from '../flight.model';
import { Passenger } from '../../passenger/passenger.model';


export const FETCH_FLIGHTS='SET_FLIGHTS';

export const ADD_PASSENGERS='ADD_PASSENGERS';

export class SetFlights implements Action {
readonly type=FETCH_FLIGHTS;
constructor(public payload :Flight[]){

}
}

export class AddPassengers implements Action {
    readonly type=ADD_PASSENGERS;
    constructor(public payload:Passenger[]){}
}

export type FlightActions=SetFlights | AddPassengers;