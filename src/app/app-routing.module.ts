import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightComponent } from './shared/flight/flight.component';
import { AuthGuard } from './shared/auth/auth-guard';
import { AdminComponent } from './admin/admin.component';
import { PassengerComponent } from './shared/passenger/passenger.component';



const routes: Routes = [
 {path:'',component:FlightComponent,canActivate:[AuthGuard]},
 {path:'admin',component:AdminComponent},
 {path:'passenger',component:PassengerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
