import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FlightsComponent } from './components/flight-list/flights.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AddFlightComponent } from './components/flight-add/add-flight.component';
import { EditFlightComponent } from './components/flight-edit/edit-flight.component';
import { PassengersComponent } from './components/passenger-list/passengers.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
import { PassengerAddComponent } from './components/passenger-add/passenger-add.component';
import { PassengerEditComponent } from './components/passenger-edit/passenger-edit.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { ReservationAddComponent } from './components/reservation-add/reservation-add.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'flights',component: FlightsComponent},
  {path:'flights/:id', component:FlightDetailComponent},
  {path:'add/flight', component:AddFlightComponent},
  {path:'edit/flight/:id',component:EditFlightComponent},
  {path:'passengers',component:PassengersComponent},
  {path:'passengers/:id',component:PassengerDetailComponent},
  {path:'add/passenger',component:PassengerAddComponent},
  {path:'edit/passenger/:id',component:PassengerEditComponent},
  {path:'reservations',component:ReservationListComponent},
  {path:'reservations/:id',component:ReservationDetailComponent},
  {path:'add/reservation',component:ReservationAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
