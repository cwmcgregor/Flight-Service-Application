import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Passenger } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import { FlightReservation } from 'src/app/models/flightReservation';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.css']
})
export class PassengerDetailComponent implements OnInit {

  @Input() passenger?: Passenger;
  flights:FlightReservation[]=[];
  constructor(private route: ActivatedRoute, private passengerService: PassengerService, private location:Location, private router:Router) { }

  ngOnInit(): void {
    this.getPassenger();
    this.getPassengersFlights();
  }

  getPassenger():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.passengerService.getPassenger(id).subscribe(passenger=>this.passenger=passenger)
  }

  deletePassenger():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.passengerService.deletePassenger(id).subscribe({next:(res)=>{
      console.log(res);
      this.router.navigate(['/passengers']);
    }})
  }
  getPassengersFlights():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.passengerService.getPassengersFlights(id).subscribe(flights=>this.flights=flights)
  }

}
