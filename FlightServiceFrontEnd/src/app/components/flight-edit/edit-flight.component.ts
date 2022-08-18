import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FlightService } from 'src/app/services/flight.service';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {

  public editFlightForm!: FormGroup

  @Input() flight?: Flight;

  constructor(private route: ActivatedRoute, private flightService: FlightService, private location:Location,private router:Router) { }

  ngOnInit(): void {
    this.getFlight();
    this.editFlightForm=new FormGroup({
      id: new FormControl('',Validators.required),
      flightNumber: new FormControl('',Validators.required),
      departureAirport: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]),
      departureDateTime: new FormControl('',Validators.required),
      arrivalAirport: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]),
      arrivalDateTime: new FormControl('',Validators.required),
      maxCapacity: new FormControl('',[Validators.required,Validators.min(1)]),
      seatsReserved: new FormControl('',[Validators.required,Validators.min(0)])
    });

    this.editFlightForm.get('seatsReserved')?.setValidators(this.greaterThan('maxCapacity'));
  }

  get f(){return this.editFlightForm.controls}

  getFlight():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.flightService.getFlight(id).subscribe(flight=>this.flight=flight)
  }

  submit(){
    this.flightService.updateFlight(this.editFlightForm.value).subscribe(()=>{
      console.log(this.editFlightForm.value);
      console.log(this.editFlightForm.valid);
      console.log("Flight modified");
      this.router.navigateByUrl('/flights')
    });
  }

  greaterThan(field:string):ValidatorFn{
    return (control:AbstractControl): {[key:string]:any}=>{
      const group=control.parent;
      const fieldToCompare=group?.get(field);
      const isLessThan=Number(fieldToCompare?.value)<Number(control.value);
      return isLessThan ? control.value : null;
    }
  }

}
