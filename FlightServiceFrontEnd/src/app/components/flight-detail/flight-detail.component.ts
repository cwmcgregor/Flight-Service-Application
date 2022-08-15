import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerReservation } from 'src/app/models/passengerReservation';


@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  @Input() flight?: Flight;
  passengers:PassengerReservation[]=[];
  constructor(private route: ActivatedRoute, private flightService: FlightService, private location:Location, private router:Router) { }

  ngOnInit(): void {
    this.getFlight();
    this.getFlightsPassengers();
  }

  getFlight():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.flightService.getFlight(id).subscribe(flight=>this.flight=flight)
  }

  deleteFlight():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.flightService.deleteFlight(id).subscribe({next:(res)=>{
      console.log(res);
      this.router.navigate(['/flights']);
    }})
  }

  getFlightsPassengers():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.flightService.getFlightsPassengers(id).subscribe(passenger=>this.passengers=passenger)
  }
  
}
