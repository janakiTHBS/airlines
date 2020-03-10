import { Flight } from '../flight.model';
import { Passenger } from '../../passenger/passenger.model';
import * as FlightActions from '../store/flight.actions';
export interface State {
    flights:Flight[],
    passengers:Passenger[]
}

const initialState:State= {
    flights:[
        new Flight('1','AirIndia','Bangalore','Hyd',
        new Date("2020-03-09T06:00:00Z"),new Date()),
        new Flight('2','AirAP','Bangalore','Hyd',
        new Date("2020-03-12T08:00:00Z"),new Date()),
        new Flight('3','AirKarnataka','Bangalore','Hyd',
        new Date("2020-03-09T11:00:00Z"),new Date()),
        new Flight('4','AirChennai','Bangalore','Hyd',new Date("2020-03-09T05:00:00Z"),
        new Date())
    ],
    passengers:null,

}
export function FlightState (state=initialState,action:FlightActions.FlightActions){

    switch(action.type){
        case FlightActions.FETCH_FLIGHTS:
            return {
                ...state,
            };
        case FlightActions.ADD_PASSENGERS:
            return {
                ...state,
                passengers:action.payload
            }    
        default :
        return state;  
    }
}