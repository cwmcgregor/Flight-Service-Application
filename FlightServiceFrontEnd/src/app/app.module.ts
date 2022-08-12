import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { FlightModule } from './modules/flight/flight.module';

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent
   
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
