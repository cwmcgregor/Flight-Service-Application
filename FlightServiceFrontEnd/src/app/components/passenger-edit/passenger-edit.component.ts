import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PassengerService } from 'src/app/services/passenger.service';
import { Passenger } from 'src/app/models/passenger';

@Component({
  selector: 'app-passenger-edit',
  templateUrl: './passenger-edit.component.html',
  styleUrls: ['./passenger-edit.component.css']
})
export class PassengerEditComponent implements OnInit {

  public editPassengerForm!: FormGroup

  @Input() passenger?: Passenger;

  constructor(private route: ActivatedRoute, private passengerService: PassengerService, private location:Location,private router:Router) { }

  ngOnInit(): void {
    this.getPassenger();
    this.editPassengerForm=new FormGroup({
      id: new FormControl('',Validators.required),
      firstMidName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      dob: new FormControl('',Validators.required),
      job: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required)
    });
  }

  get f(){return this.editPassengerForm.controls}

  getPassenger():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.passengerService.getPassenger(id).subscribe(passenger=>this.passenger=passenger)
  }

  submit(){
    this.passengerService.updatePassenger(this.editPassengerForm.value).subscribe(()=>{
      console.log(this.editPassengerForm.value);
      console.log(this.editPassengerForm.valid);
      console.log("Passenger modified");
      this.router.navigateByUrl('passengers/')
    });
  }

}
