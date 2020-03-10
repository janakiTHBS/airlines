import { Passenger } from '../passenger/passenger.model';


export class Flight {
    id:string;
    name:string;
    to:string;
    from:string;
    timeOfDeparture:Date;
    timeOfArrival:Date;
    passengers:Passenger[];
    constructor(id:string,name:string,to:string,from:string,
        timeOfDeparture:Date,timeOfArrival:Date,passengers?:Passenger[]){
            this.id=id;
            this.name=name;
            this.to=to;
            this.from=from;
            this.timeOfDeparture=timeOfDeparture;
            this.timeOfArrival=timeOfArrival;
            this.passengers=passengers;
        }

}