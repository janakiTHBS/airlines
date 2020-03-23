import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import * as fromApp from "./app.reducer";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./shared/auth/auth.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MaterialModule } from "./material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthEffects } from "./shared/auth/store/auth.effects";
import { FlightComponent } from "./shared/flight/flight.component";
import { AlertComponent } from "./shared/auth/alert/alert.component";
import { HeaderComponent } from "./header/header.component";
import { PassengerComponent } from "./shared/passenger/passenger.component";
import { AuthRoutingModule } from "./shared/auth/auth-routing.module";
import { AdminComponent } from "./admin/admin.component";
import { FlightsComponent } from "./admin/flights/flights.component";
import { ServiceComponent } from "./admin/service/service.component";
import { SeatMapComponent } from "./shared/seat-map/seat-map.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { PassengerService } from "./shared/passenger/passenger.service";
import { FlightService } from "./shared/flight/flight.service";
import { Auth2Component } from "./shared/auth2/auth2.component";
import { LoginComponent } from "./shared/auth2/login/login.component";

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { SignupComponent } from "./shared/auth2/signup/signup.component";
import { UserEffects } from "./shared/auth2/store/user.effects";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FlightComponent,
    AlertComponent,
    HeaderComponent,
    PassengerComponent,
    AdminComponent,
    FlightsComponent,
    ServiceComponent,
    SeatMapComponent,
    Auth2Component,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      "angular-auth-firebase"
    ),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SeatMapComponent]
})
export class AppModule {}
