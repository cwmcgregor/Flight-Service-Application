import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FlightsComponent } from './components/flights/flights.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { EditFlightComponent } from './components/edit-flight/edit-flight.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'flights',component: FlightsComponent},
  {path:'flights/:id', component:FlightDetailComponent},
  {path:'add/flight', component:AddFlightComponent},
  {path:'edit/flight/:id',component:EditFlightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
