import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlightService } from 'src/app/services/flight.service';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {

flights:Flight[]=[];
passengers:Passenger[]=[];
selectedPassenger?:Passenger;
selectedFlight?:Flight;

  constructor(private flightService: FlightService, private passengerService:PassengerService, private reservationService:ReservationService, private router:Router) { }

  ngOnInit(): void {
    this.getFlights();
    this.getAllPassengers();
  }

  selectFlight(flight:Flight): void {
    this.selectedFlight = flight;
  }

  selectPassenger(passenger:Passenger):void{
    this.selectedPassenger=passenger;
  }

  getAllPassengers():void{
    this.passengerService.getAllPassengers().subscribe(passengers=>this.passengers=passengers);
  }

 getFlights():void{
  this.flightService.getAvailableFlights().subscribe(flights=>this.flights=flights);
 }

 addSeatReservation(flight:Flight):Flight{
  let updatedFlight:Flight=flight;
  updatedFlight.seatsReserved+=1;
  console.log(updatedFlight.seatsReserved)
  return updatedFlight;
 }


  createReservation():void{
    let newReservation:Reservation={flightId:Number(this.selectedFlight?.id),passengerId:Number(this.selectedPassenger?.id)}
    if(Number(this.selectedFlight?.seatsReserved)<Number(this.selectedFlight?.maxCapacity)){
    this.reservationService.createNewReservation(newReservation).subscribe(()=>{
      if(this.selectedFlight){
      let updatedFlight=this.addSeatReservation(this.selectedFlight);
      this.flightService.updateFlight(updatedFlight).subscribe();
      }

      
      console.log("Reservation created");
      
 
    
      this.router.navigateByUrl('reservations/')
    })
  }
  }
}
