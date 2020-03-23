import { Seat } from "../seat-map/seat.model";

export class Passenger {
  id: string;
  name: string;
  service: string;
  seatNumber: Seat;
  constructor(id: string, name: string, seatNumber: Seat, service?: string) {
    this.id = id;
    this.name = name;
    this.service = service;
    this.seatNumber = seatNumber;
  }
}
