import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './components/flight-list/flights.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AddFlightComponent } from './components/flight-add/add-flight.component';
import { FlightModule } from './modules/flight/flight.module';
import { EditFlightComponent } from './components/flight-edit/edit-flight.component';
import { PassengersComponent } from './components/passenger-list/passengers.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
import { PassengerAddComponent } from './components/passenger-add/passenger-add.component';
import { PassengerEditComponent } from './components/passenger-edit/passenger-edit.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { ReservationAddComponent } from './components/reservation-add/reservation-add.component';

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent,
   EditFlightComponent,
   PassengersComponent,
   PassengerDetailComponent,
   PassengerAddComponent,
   PassengerEditComponent,
   ReservationListComponent,
   ReservationDetailComponent,
   ReservationAddComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
