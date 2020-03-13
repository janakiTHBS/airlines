import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import * as fromApp from './app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './shared/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AuthEffects } from './shared/auth/store/auth.effects';
import { FlightComponent } from './shared/flight/flight.component';
import { AlertComponent } from './shared/auth/alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { PassengerComponent } from './shared/passenger/passenger.component';
import { AuthRoutingModule } from './shared/auth/auth-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FlightsComponent } from './admin/flights/flights.component';
import { ServiceComponent } from './admin/service/service.component';
import { SeatMapComponent } from './shared/seat-map/seat-map.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,]),
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
