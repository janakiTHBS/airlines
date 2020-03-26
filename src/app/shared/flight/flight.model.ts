import { Passenger } from '../passenger/passenger.model';
import { Seat } from '../seat-map/seat.model';


export class Flight {
    id:string;
    name:string;
    to:string;
    from:string;
    timeOfDeparture:Date;
    timeOfArrival:Date;
    passengers:Passenger[];
    services:string[];
    constructor(id:string,name:string,to:string,from:string,
        timeOfDeparture:Date,
        timeOfArrival:Date,
        passengers?:Passenger[],
        services?:string[]){
            this.id=id;
            this.name=name;
            this.to=to;
            this.from=from;
            this.timeOfDeparture=timeOfDeparture;
            this.timeOfArrival=timeOfArrival;
            this.passengers=passengers;
            this.services=services;
        }

}