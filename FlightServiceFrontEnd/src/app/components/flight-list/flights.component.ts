import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';

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
  selectedFlight?: Flight;

    getAllFlights():void{
      this.flightService.getAllFlights().subscribe(flights=>this.flights=flights);
    }

    deleteFlight(id:number):void{
    
      this.flightService.deleteFlight(id).subscribe({next:(res)=>{
        console.log(res);
        this.router.navigate(['/flights']).then(() => {
          location.reload();
      });
      }})
    }
  
}
