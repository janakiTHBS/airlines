import { Flight } from '../flight.model';
import { Passenger } from '../../passenger/passenger.model';
import * as FlightActions from '../store/flight.actions';
export interface State {
    flights:Flight[];
   
}

const initialState:State= {
    flights:[
        new Flight('1','AirIndia','Bangalore','Hyd',
        new Date("2020-03-09T06:00:00Z"),new Date(),
        [new Passenger(1,'Janaki','BE15','wheelchair')],[]),
        new Flight('2','AirAP','Bangalore','Hyd',
        new Date("2020-03-12T08:00:00Z"),new Date()
        ,[new Passenger(1,'Janaki','infants','BE15')],[]),
        new Flight('3','AirKarnataka','Bangalore','Hyd',
        new Date("2020-03-09T11:00:00Z"),new Date(),
        [new Passenger(1,'Janaki','infants','BE15')],[]),
        new Flight('4','AirChennai','Bangalore','Hyd',new Date("2020-03-09T05:00:00Z"),
        new Date(),[new Passenger(1,'Janaki','infants','BE15')],[])
    ],


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
               
            } ;
        case FlightActions.ADD_PASSENGER:
            const flight=state.flights[action.payload.index];

            const updatedFlight={
              ...flight,
              passengers:[...flight.passengers,action.payload.passenger]
            }
         
            const updatedFlights=[...state.flights];
           updatedFlights[action.payload.index]=updatedFlight;
            return {
                ...state,
                flights:updatedFlights
            };
            
           case FlightActions.ADD_SERVICE:
               const updateService=state.flights[action.payload.index];

               const updatedService={
                   ...updateService,
                   services:[...updateService.services,action.payload.service]
               }
               console.log(updatedService);
               const serviceUpdatedFlights=[...state.flights];
               serviceUpdatedFlights[action.payload.index]=updatedService;
               return {
                   ...state,
                   flights:serviceUpdatedFlights

               } ;
        default :
        return state;  
    }
}