import { Component, OnInit, Input,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerReservation } from 'src/app/models/passengerReservation';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Passenger } from 'src/app/models/passenger';
import { PassengerFilter } from 'src/app/models/passengerFilter';
import { PassengerService } from 'src/app/services/passenger.service';


@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  flight?: Flight;
  reservations:PassengerReservation[]=[];
  showForm:boolean=false;
  passengers:Passenger[]=[];
filteredPassengers:Passenger[]=[];
selectedPassenger?:Passenger;
passengerFilter:PassengerFilter={
  id: "",
  firstMidName: "",
  lastName:"",
  dob: "",
  email:"",
  job:""
}
available:boolean=false;

  constructor(private route: ActivatedRoute, private flightService: FlightService, private location:Location, private router:Router, private changeDetector:ChangeDetectorRef, private reservationService:ReservationService, private passengerService:PassengerService) { }

  ngOnInit(): void {
    this.getFlight();
    this.getFlightsPassengers();
    this.getAllPassengers();
  }

  getFlight():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.flightService.getFlight(id).subscribe(flight=>{
      this.flight=flight
      
      if(flight.maxCapacity>flight.seatsReserved){
      
        this.available=true;
        }
      
    })
  }

  deleteFlight():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.flightService.deleteFlight(id).subscribe({next:(res)=>{
      console.log(res);
      this.router.navigate(['/flights'])
  }})
  }

  getFlightsPassengers():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.flightService.getFlightsPassengers(id).subscribe(passenger=>this.reservations=passenger)
  }
  revealForm():void{
    if(this.available){
    this.showForm=true;
    }
  }
  addSeatReservation(flight:Flight):Flight{
    let updatedFlight:Flight=flight;
    updatedFlight.seatsReserved+=1;
    console.log(updatedFlight.seatsReserved)
    return updatedFlight;
   }
  createReservation():void{
    let newReservation:Reservation={flightId:Number(this.flight?.id),passengerId:Number(this.selectedPassenger?.id)}
    if(Number(this.flight?.seatsReserved)<Number(this.flight?.maxCapacity)){
    this.reservationService.createNewReservation(newReservation).subscribe(()=>{
      if(this.flight){
      let updatedFlight=this.addSeatReservation(this.flight);
      this.flightService.updateFlight(updatedFlight).subscribe();
      }

      
      console.log("Reservation created");
      
 
    
      window.location.reload();
    })
  }
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
  selectPassenger(passenger:Passenger):void{
    this.selectedPassenger=passenger;
  }
  getAllPassengers():void{
    this.passengerService.getAllPassengers().subscribe(passengers=>{
      this.passengers=passengers;
      this.filteredPassengers=this.passengers;
    });
  }
}
