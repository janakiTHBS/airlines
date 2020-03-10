import { Passenger } from '../passenger.model';

import * as PassengerActions from './passenger.actions';

export interface State{
passengers:Passenger[];
passenger:Passenger;
}

const initialState:State={
    passengers:[
        new Passenger(1,'Janaki','A15','infants'),
        new Passenger(2,'Lavanya','A16','wheel chair'),
        new Passenger(3,'Sukumar','A18'),
        new Passenger(4,'Nishvi','A19')
    ],
    passenger:null

}
export function PassengerState(state=initialState,action:PassengerActions.PassengerActions){

    switch(action.type){
        case PassengerActions.FETCH_PASSENGERS:
            return {
                ...state,
            };
        case PassengerActions.FETCH_PASSENGER:
                const passenger=state.passengers[action.payload];
            console.log(passenger);
            return {
            ...state,
            passenger:passenger
            };    
        default :
        return state;    

    }

}