import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import { FlightFilter } from 'src/app/models/flightFilter';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  constructor(private flightService:FlightService, private router:Router) { }

  ngOnInit(): void {
    this.getAllFlights();
  }
  flights:Flight[]=[];
  filteredFlights:Flight[]=[];
  selectedFlight?: Flight;
  filter:FlightFilter ={
    id:"",
    flightNumber:"",
    departureAirport:"",
    departureDateTime:"",
    arrivalAirport:"",
    arrivalDateTime:"",
    maxCapacity:"",
    seatsReserved:""

  }
  
  

    getAllFlights():void{
      this.flightService.getAllFlights().subscribe(flights=>{
        this.flights=flights;
        this.filteredFlights=this.flights;
      });
    }

    deleteFlight(id:number):void{
    
      this.flightService.deleteFlight(id).subscribe({next:(res)=>{
        console.log(res);
        this.router.navigate(['/flights']).then(() => {
          location.reload();
      });
      }})
    }
    filterFlights():void{
      if(this.filter.flightNumber!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        flight.flightNumber.includes(this.filter.flightNumber))
      }
      if(this.filter.id!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        String(flight.id).includes(this.filter.id))
      }
      if(this.filter.departureAirport!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        String(flight.departureAirport).includes(this.filter.departureAirport))
      }
      if(this.filter.departureDateTime!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        String(flight.departureDateTime).includes(this.filter.departureDateTime))
      }
      if(this.filter.arrivalAirport!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        String(flight.arrivalAirport).includes(this.filter.arrivalAirport))
      }
      if(this.filter.arrivalDateTime!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        String(flight.arrivalDateTime).includes(this.filter.arrivalDateTime))
      }
      if(this.filter.maxCapacity!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        String(flight.maxCapacity).includes(this.filter.maxCapacity))
      }
      if(this.filter.seatsReserved!=""){
        this.filteredFlights=this.filteredFlights.filter((flight)=>
        String(flight.seatsReserved).includes(this.filter.seatsReserved))
      }
    }
    resetFlights():void{
      this.filteredFlights=this.flights;
      this.filter={
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
  
}
