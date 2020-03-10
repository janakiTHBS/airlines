import {Action} from '@ngrx/store'

export const FETCH_PASSENGERS='FETCH_PASSENGERS';
export const FETCH_PASSENGER='FETCH_PASSENGER';

export class FetchPassengers implements Action {
    readonly type=FETCH_PASSENGERS;
    constructor(){
        
    }

}


export  class FetchPassenger implements Action {
    readonly type=FETCH_PASSENGER;
    constructor(public payload:number){

    }
}

export type PassengerActions=FetchPassengers | FetchPassenger;