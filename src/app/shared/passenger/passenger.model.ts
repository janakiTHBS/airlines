export class Passenger {
    id:string;
    name:string;
    service:string;
    seatNumber :string;
    constructor(id:string,name:string,seatNumber:string,service ?:string){
        this.id=id;
        this.name=name;
        this.service=service;
        this.seatNumber=seatNumber;

    }
}