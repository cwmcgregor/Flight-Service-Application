import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

import { Reservation } from '../models/reservation';
import { ReservationList } from '../models/reservationList';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationsUrl= "https://localhost:7289/api/Reservations";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAllReservations():Observable<ReservationList[]>{
    return this.http.get<ReservationList[]>(this.reservationsUrl, this.httpOptions);
  }

  getReservation(id:number):Observable<Reservation>{
    const url=`${this.reservationsUrl}/${id}`;
    return this.http.get<Reservation>(url, this.httpOptions);
  }

  createNewReservation(reservation:Reservation):Observable<Reservation>{
    return this.http.post<Reservation>(this.reservationsUrl,reservation, this.httpOptions)
  }


  deleteReservation(id:number): Observable<Reservation>{
    return this.http.delete<Reservation>(`${this.reservationsUrl}/${id}`, this.httpOptions)
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
