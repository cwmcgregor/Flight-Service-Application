import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlightService } from 'src/app/services/flight.service';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { FlightFilter } from 'src/app/models/flightFilter';
import { PassengerFilter } from 'src/app/models/passengerFilter';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {

flights:Flight[]=[];
filteredFlights:Flight[]=[];
passengers:Passenger[]=[];
filteredPassengers:Passenger[]=[];
selectedPassenger?:Passenger;
selectedFlight?:Flight;
flightFilter:FlightFilter ={
  id:"",
  flightNumber:"",
  departureAirport:"",
  departureDateTime:"",
  arrivalAirport:"",
  arrivalDateTime:"",
  maxCapacity:"",
  seatsReserved:""

}
passengerFilter:PassengerFilter={
  id: "",
  firstMidName: "",
  lastName:"",
  dob: "",
  email:"",
  job:""
}

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
    this.passengerService.getAllPassengers().subscribe(passengers=>{
      this.passengers=passengers;
      this.filteredPassengers=this.passengers;
    });
  }

  getFlights():void{
    this.flightService.getAvailableFlights().subscribe(flights=>{
      this.flights=flights;
      this.filteredFlights=this.flights;
    });
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
      
 
    
      this.router.navigateByUrl('/reservations')
    })
  }
  }
  filterFlights():void{
    if(this.flightFilter.flightNumber!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      flight.flightNumber.includes(this.flightFilter.flightNumber))
    }
    if(this.flightFilter.id!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      String(flight.id).includes(this.flightFilter.id))
    }
    if(this.flightFilter.departureAirport!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      String(flight.departureAirport).includes(this.flightFilter.departureAirport))
    }
    if(this.flightFilter.departureDateTime!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      String(flight.departureDateTime).includes(this.flightFilter.departureDateTime))
    }
    if(this.flightFilter.arrivalAirport!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      String(flight.arrivalAirport).includes(this.flightFilter.arrivalAirport))
    }
    if(this.flightFilter.arrivalDateTime!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      String(flight.arrivalDateTime).includes(this.flightFilter.arrivalDateTime))
    }
    if(this.flightFilter.maxCapacity!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      String(flight.maxCapacity).includes(this.flightFilter.maxCapacity))
    }
    if(this.flightFilter.seatsReserved!=""){
      this.filteredFlights=this.filteredFlights.filter((flight)=>
      String(flight.seatsReserved).includes(this.flightFilter.seatsReserved))
    }
  }
  resetFlights():void{
    this.filteredFlights=this.flights;
    this.flightFilter={
      id:"",
      flightNumber:"",
      departureAirport:"",
      departureDateTime:"",
      arrivalAirport:"",
      arrivalDateTime:"",
      maxCapacity:"",
      seatsReserved:""
  
    };
  }
  filterPassengers():void{
    console.log("this is firing")
    if(this.passengerFilter.firstMidName!=""){
      this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
      passenger.firstMidName.includes(this.passengerFilter.firstMidName))
    }
    if(this.passengerFilter.id!=""){
      this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
      String(passenger.id).includes(this.passengerFilter.id))
    }
    if(this.passengerFilter.lastName!=""){
      this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
      String(passenger.lastName).includes(this.passengerFilter.lastName))
    }
    if(this.passengerFilter.dob!=""){
      this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
      String(passenger.dob).includes(this.passengerFilter.dob))
    }
    if(this.passengerFilter.email!=""){
      this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
      String(passenger.email).includes(this.passengerFilter.email))
    }
    if(this.passengerFilter.job!=""){
      this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
      String(passenger.job).includes(this.passengerFilter.job))
    }
  }
  resetPassengers():void{
    this.filteredPassengers=this.passengers;
    this.passengerFilter={
      id:"",
      firstMidName:"",
      lastName:"",
      dob:"",
      email:"",
      job:"",
    };
  }

}
