import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

import { Passenger } from '../models/passenger';
import { FlightReservation } from '../models/flightReservation';



@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private passengersUrl= "https://localhost:7289/api/Passengers";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

 
  constructor(private http: HttpClient) { }

  getAllPassengers():Observable<Passenger[]>{
    return this.http.get<Passenger[]>(this.passengersUrl, this.httpOptions);
  }

  getPassenger(id:number):Observable<Passenger>{
    const url=`${this.passengersUrl}/${id}`;
    return this.http.get<Passenger>(url, this.httpOptions);
  }

  createNewPassenger(passenger:Passenger):Observable<Passenger>{
    return this.http.post<Passenger>(this.passengersUrl,passenger, this.httpOptions)
  }

  updatePassenger(passenger:Passenger): Observable<Passenger>{
    let  url=`${this.passengersUrl}/${passenger.id}`;
    return this.http.put<Passenger>(url,passenger, this.httpOptions);
  }

  deletePassenger(id:number): Observable<Passenger>{
    return this.http.delete<Passenger>(`${this.passengersUrl}/${id}`, this.httpOptions)
  }

  getPassengersFlights(id:number):Observable<FlightReservation[]>{
    return this.http.get<FlightReservation[]>(`${this.passengersUrl}/${id}/Reservations`,this.httpOptions)
  }
}
