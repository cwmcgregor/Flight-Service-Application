import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-passenger-add',
  templateUrl: './passenger-add.component.html',
  styleUrls: ['./passenger-add.component.css']
})
export class PassengerAddComponent implements OnInit {

  public addPassengerForm!: FormGroup

  constructor(private passengerService: PassengerService, private router:Router) { }

  ngOnInit(): void {
    this.addPassengerForm=new FormGroup({
      firstMidName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      dob: new FormControl('',Validators.required),
      job: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required)
    });
  }

  get f(){return this.addPassengerForm.controls}

  submit(){
    this.passengerService.createNewPassenger(this.addPassengerForm.value).subscribe(()=>{
      console.log(this.addPassengerForm.value);
      console.log(this.addPassengerForm.valid);
      console.log("Passenger created");
      this.router.navigateByUrl('/passengers')
    });
  }
}
