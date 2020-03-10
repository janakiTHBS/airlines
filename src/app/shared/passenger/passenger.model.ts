export class Passenger {
    id:number;
    name:string;
    service:string;
    seatNumber :string;
    constructor(id:number,name:string,seatNumber:string,service ?:string){
        this.id=id;
        this.name=name;
        this.service=service;
        this.seatNumber=seatNumber;

    }
}