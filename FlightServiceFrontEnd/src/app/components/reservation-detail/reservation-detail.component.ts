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
reservation?:Reservation;
flight?:Flight;
passenger?:Passenger;
id?:number;
  constructor(private route: ActivatedRoute, private flightService: FlightService, private location:Location, private router:Router, private passengerService:PassengerService,private reservationService:ReservationService) { }

  ngOnInit(): void {
    this.getReservation();
  }
  getReservation():void{
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.reservationService.getReservation(this.id).subscribe(reservation=>{
      this.reservation=reservation;
      let flightId=Number(this.reservation?.flightId);
    this.flightService.getFlight(flightId).subscribe(flight=>this.flight=flight);
    let passengerId=Number(this.reservation?.passengerId);
    this.passengerService.getPassenger(passengerId).subscribe(passenger=>this.passenger=passenger);
    });
  }

  deleteReservation():void{
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.reservationService.deleteReservation(this.id).subscribe();
    if(this.flight){
    let updatedFlight=this.removeSeatReservation(this.flight);
    this.flightService.updateFlight(updatedFlight).subscribe();
    this.router.navigate(['/reservations']).then(() => {
      location.reload();
    });
    }
  }
  removeSeatReservation(flight:Flight):Flight{
    let updatedFlight:Flight=flight;
    updatedFlight.seatsReserved-=1;
    console.log(updatedFlight.seatsReserved)
    return updatedFlight;
   }

}
