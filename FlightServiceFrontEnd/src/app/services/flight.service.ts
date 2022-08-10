import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { MOCKFLIGHTS } from '../mock-flights';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor() { }

  getAllFlights():Observable<Flight[]>{
    const flights=of(MOCKFLIGHTS);
    return flights;
  }
}
