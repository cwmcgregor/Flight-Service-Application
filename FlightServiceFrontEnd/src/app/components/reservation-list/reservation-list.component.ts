import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationList } from 'src/app/models/reservationList';
import { ReservationListFilter } from 'src/app/models/resrvationListFilter';
import { FlightService } from 'src/app/services/flight.service';
import { Flight } from 'src/app/models/flight';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private reservationService:ReservationService, private router:Router, private flightService:FlightService) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  reservations:ReservationList[]=[];
  filteredReservations:ReservationList[]=[];
  selectedReservation?: Reservation;
  filter:ReservationListFilter={
    id: "",
    firstMidName: "",
    lastName: "",
    flightNumber: "",
    departureDateTime: "",
    arrivalDateTime: "",
    departureAirport: "",
    arrivalAirport: ""
    }

    getAllReservations():void{
      this.reservationService.getAllReservations().subscribe(reservations=>{
        this.reservations=reservations;
        this.filteredReservations=this.reservations;
      });
    }

    filterReservations():void{
      if(this.filter.flightNumber!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        flight.flightNumber.includes(this.filter.flightNumber))
      }
      if(this.filter.id!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        String(flight.id).includes(this.filter.id))
      }
      if(this.filter.departureAirport!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        String(flight.departureAirport).includes(this.filter.departureAirport))
      }
      if(this.filter.departureDateTime!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        String(flight.departureDateTime).includes(this.filter.departureDateTime))
      }
      if(this.filter.arrivalAirport!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        String(flight.arrivalAirport).includes(this.filter.arrivalAirport))
      }
      if(this.filter.arrivalDateTime!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        String(flight.arrivalDateTime).includes(this.filter.arrivalDateTime))
      }
      if(this.filter.firstMidName!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        String(flight.firstMidName).includes(this.filter.firstMidName))
      }
      if(this.filter.lastName!=""){
        this.filteredReservations=this.filteredReservations.filter((flight)=>
        String(flight.lastName).includes(this.filter.lastName))
      }
    }
    resetReservations():void{
      this.filteredReservations=this.reservations;
      this.filter={
        id:"",
        flightNumber:"",
        departureAirport:"",
        departureDateTime:"",
        arrivalAirport:"",
        arrivalDateTime:"",
        firstMidName:"",
        lastName:""
    
      };
    }

    removeSeatReservation(flight:Flight):Flight{
      let updatedFlight:Flight=flight;
      updatedFlight.seatsReserved-=1;
      console.log(updatedFlight.seatsReserved)
      return updatedFlight;
     }

    deleteReservation(id:number):void{
      
      this.reservationService.deleteReservation(id).subscribe();
       
        this.reservationService.getReservation(id).subscribe(reservation=>{
          this.flightService.getFlight(reservation.flightId).subscribe(flight=>{
            let updatedFlight=this.removeSeatReservation(flight);
            this.flightService.updateFlight(updatedFlight).subscribe(()=>{
              this.router.navigate(['/reservations']).then(() => {
                location.reload();
              });
            });
          })
        });
      
      }
    }
    
  


