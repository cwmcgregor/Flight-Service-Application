import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

import { Flight } from '../models/flight';
import { PassengerReservation } from '../models/passengerReservation';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flightsUrl= "https://localhost:7289/api/Flights";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAllFlights():Observable<Flight[]>{
    return this.http.get<Flight[]>(this.flightsUrl, this.httpOptions);
  }

  getAvailableFlights():Observable<Flight[]>{
    const url=`${this.flightsUrl}/Available`
    return this.http.get<Flight[]>(url, this.httpOptions);
  }

  getFlight(id:number):Observable<Flight>{
    const url=`${this.flightsUrl}/${id}`;
    return this.http.get<Flight>(url, this.httpOptions);
  }

  createNewFlight(flight:Flight):Observable<Flight>{
    return this.http.post<Flight>(this.flightsUrl,flight, this.httpOptions)
  }

  updateFlight(flight:Flight): Observable<Flight>{
    let  url=`${this.flightsUrl}/${flight.id}`;
    return this.http.put<Flight>(url,flight, this.httpOptions);
  }

  deleteFlight(id:number): Observable<Flight>{
    return this.http.delete<Flight>(`${this.flightsUrl}/${id}`, this.httpOptions)
  }

  getFlightsPassengers(id:number):Observable<PassengerReservation[]>{
    return this.http.get<PassengerReservation[]>(`${this.flightsUrl}/${id}/Reservations`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
