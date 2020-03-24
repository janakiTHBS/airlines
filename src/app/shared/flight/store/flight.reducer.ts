import { Flight } from "../flight.model";
import { Passenger } from "../../passenger/passenger.model";
import * as FlightActions from "../store/flight.actions";
import { Seat } from "../../seat-map/seat.model";
export interface State {
  flights: Flight[];
}

const initialState: State = {
  flights: [
    new Flight(
      "0",
      "AirIndia",
      "Bangalore",
      "Hyd",
      new Date("2020-04-15T06:00:00Z"),
      new Date(),
      [new Passenger("1Br", "Janaki", new Seat("2B", "yellow"), "wheelchair")],
      ["wheel chair"]
    ),
    new Flight(
      "1",
      "AirAP",
      "Bangalore",
      "Hyd",
      new Date("2020-03-12T08:00:00Z"),
      new Date(),
      [new Passenger("ebgh", "Janaki", new Seat("3C", "orange"), "Infants")],
      ["Infants"]
    ),
    new Flight(
      "2",
      "AirKarnataka",
      "Bangalore",
      "Hyd",
      new Date("2020-03-09T11:00:00Z"),
      new Date(),
      [new Passenger("bdhft", "Lavanya", new Seat("4F", "red"), "infants")],
      ["special meals"]
    ),
    new Flight(
      "3",
      "AirChennai",
      "Bangalore",
      "Hyd",
      new Date("2020-03-09T05:00:00Z"),
      new Date(),
      [new Passenger("APKW", "Janaki", new Seat("2E", "yellow"), "infants")],
      ["wheel chair"]
    )
  ]
};
export function FlightState(
  state = initialState,
  action: FlightActions.FlightActions
) {
  switch (action.type) {
    case FlightActions.FETCH_FLIGHTS:
      return {
        ...state
      };
    case FlightActions.ADD_PASSENGERS:
      return {
        ...state
      };
    case FlightActions.ADD_PASSENGER:
      const flight = state.flights[action.payload.index];

      const updatedFlight = {
        ...flight,
        passengers: [...flight.passengers, action.payload.passenger]
      };

      const updatedFlights = [...state.flights];
      updatedFlights[action.payload.index] = updatedFlight;
      console.log(updatedFlights);
      return {
        ...state,
        flights: updatedFlights
      };

    case FlightActions.ADD_SERVICE:
      const updateService = state.flights[action.payload.index];

      const updatedService = {
        ...updateService,
        services: [...updateService.services, action.payload.service]
      };
      console.log(updatedService);
      const serviceUpdatedFlights = [...state.flights];
      serviceUpdatedFlights[action.payload.index] = updatedService;
      return {
        ...state,
        flights: serviceUpdatedFlights
      };
    case FlightActions.UPDATE_PASSENGER:
      let passengers: Passenger[] = [];
      console.log(action.payload.passenger);
      const updateFlight = state.flights[action.payload.fid];
      state.flights[action.payload.fid].passengers.forEach(passenger => {
        if (passenger.id == action.payload.pid) {
          passengers.push(action.payload.passenger);
        } else {
          passengers.push(passenger);
        }
      });
      console.log(passengers);

      const updatedPsgInFlight = {
        ...updateFlight,
        passengers: [...passengers]
      };

      console.log(updatedPsgInFlight);
      const finalUpdatedFlights = [...state.flights];
      finalUpdatedFlights[action.payload.fid] = updatedPsgInFlight;

      return {
        ...state,
        flights: finalUpdatedFlights
      };
    default:
      return state;
  }
}
