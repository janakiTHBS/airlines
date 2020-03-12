
import {Action} from '@ngrx/store';
import { Flight } from '../flight.model';
import { Passenger } from '../../passenger/passenger.model';


export const FETCH_FLIGHTS='SET_FLIGHTS';

export const ADD_PASSENGERS='ADD_PASSENGERS';

export const ADD_PASSENGER='ADD_PASSENEGR';

export const UPDATE_PASSENGER='UPDATE_PASSENGER';

export const ADD_SERVICE='ADD-SERVICE';

export class UpdatePassenger implements Action {
    readonly type=UPDATE_PASSENGER;
    constructor(public payload:{fid:number,pid:string,passenger:Passenger}){}

}

export class AddService implements Action {
    readonly type=ADD_SERVICE;
    constructor(public payload:{service:string,index:number}){}
}

export class SetFlights implements Action {
readonly type=FETCH_FLIGHTS;
constructor(public payload :Flight[]){

}
}

export class AddPassenger implements Action {
   readonly type=ADD_PASSENGER;
   constructor(public payload:{index:number,passenger:Passenger}){}
}
export class AddPassengers implements Action {
    readonly type=ADD_PASSENGERS;
    constructor(public payload:Passenger[]){}
}

export type FlightActions=SetFlights | AddPassengers 
|AddPassenger| AddService |UpdatePassenger;