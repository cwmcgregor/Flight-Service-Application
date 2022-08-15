import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Passenger } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
@Input()reservation?:Reservation;
@Input()flight?:Flight;
@Input()passenger?:Passenger;
  constructor(private route: ActivatedRoute, private flightService: FlightService, private location:Location, private router:Router, private passengerService:PassengerService,private reservationService:ReservationService) { }

  ngOnInit(): void {
    this.getReservation();
    // this.getFlight();
    // this.getPassenger();
  }
  getReservation():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.reservationService.getReservation(id).subscribe(reservation=>this.reservation=reservation)
    const flightId=Number(this.reservation?.flightId);
    this.flightService.getFlight(flightId).subscribe(flight=>this.flight=flight)
    const passengerId=Number(this.reservation?.passengerId);
    this.passengerService.getPassenger(passengerId).subscribe(passenger=>this.passenger=passenger)
  }

  // getFlight():void{
  //   const flightId=Number(this.reservation?.flightId);
  //   this.flightService.getFlight(flightId).subscribe(flight=>this.flight=flight)
  // }

  // getPassenger():void{
  //   const passengerId=Number(this.reservation?.passengerId);
  //   this.passengerService.getPassenger(passengerId).subscribe(passenger=>this.passenger=passenger)
  // }

}
