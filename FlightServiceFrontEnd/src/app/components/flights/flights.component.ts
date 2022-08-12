import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  constructor(private flightService:FlightService) { }

  ngOnInit(): void {
    this.getAllFlights();
  }

  flights:Flight[]=[];
  selectedFlight?: Flight;

    getAllFlights():void{
      this.flightService.getAllFlights().subscribe(flights=>this.flights=flights);
    }
  
}
