import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  public addFlightForm!: FormGroup

  constructor(private flightService: FlightService, private router:Router) { }

  ngOnInit(): void {
    this.addFlightForm=new FormGroup({
      flightNumber: new FormControl('',Validators.required),
      departureAirport: new FormControl('',Validators.required),
      departureDateTime: new FormControl('',Validators.required),
      arrivalAirport: new FormControl('',Validators.required),
      arrivalDateTime: new FormControl('',Validators.required),
      maxCapacity: new FormControl('',Validators.required),

    });
  }

  get f(){return this.addFlightForm.controls}

  submit(){
    this.flightService.createNewFlight(this.addFlightForm.value).subscribe(()=>{
      console.log(this.addFlightForm.value);
      console.log(this.addFlightForm.valid);
      console.log("Flight created");
      this.router.navigateByUrl('flights/')
    });
  }
}
