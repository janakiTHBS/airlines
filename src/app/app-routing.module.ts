import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlightComponent } from "./shared/flight/flight.component";
import { AuthGuard } from "./shared/auth/auth-guard";
import { AdminComponent } from "./admin/admin.component";
import { PassengerComponent } from "./shared/passenger/passenger.component";
import { FlightsComponent } from "./admin/flights/flights.component";
import { ServiceComponent } from "./admin/service/service.component";
import { SeatMapComponent } from "./shared/seat-map/seat-map.component";

const routes: Routes = [
  { path: "", component: FlightComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent },
  { path: "flights/:id/passenger", component: PassengerComponent },
  { path: "flights/:id", component: FlightsComponent },
  { path: "flights/:id/service", component: ServiceComponent },
  { path: "seats", component: SeatMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
