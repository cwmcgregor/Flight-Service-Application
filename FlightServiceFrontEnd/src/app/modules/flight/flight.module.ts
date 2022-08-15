import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlightsComponent } from 'src/app/components/flight-list/flights.component';
import { AddFlightComponent } from 'src/app/components/flight-add/add-flight.component';
import { FlightDetailComponent } from 'src/app/components/flight-detail/flight-detail.component';



@NgModule({
  declarations: [
    FlightsComponent,
    FlightDetailComponent,
    AddFlightComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class FlightModule { }
