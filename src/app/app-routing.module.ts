import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlightComponent } from "./shared/flight/flight.component";
import { AuthGuard } from "./shared/auth/auth-guard";
import { AdminComponent } from "./admin/admin.component";
import { PassengerComponent } from "./shared/passenger/passenger.component";
import { FlightsComponent } from "./admin/flights/flights.component";
import { ServiceComponent } from "./admin/service/service.component";
import { SeatMapComponent } from "./shared/seat-map/seat-map.component";
import { AuthguardService } from "./shared/auth2/authguard.service";
import { LoginComponent } from "./shared/auth2/login/login.component";
import { SignupComponent } from "./shared/auth2/signup/signup.component";
import { SelectSeatComponent } from './shared/flight/select-seat/select-seat.component';

const routes: Routes = [
  { path: "flight", component: FlightComponent },
  { path: "", component: LoginComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthguardService] },
  {
    path: "flights/:id/passenger",
    component: PassengerComponent,
    children: [{ path: "seats", component: SeatMapComponent }]
  },
  { path: "flights/:id", component: FlightsComponent },
  { path: "flights/:id/service", component: ServiceComponent },
  { path: "signup", component: SignupComponent },
  {path:"select-seat",component:SelectSeatComponent,children:[
    { path: "seats", component: SeatMapComponent }
  ]},
  { path: "seats", component: SeatMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
