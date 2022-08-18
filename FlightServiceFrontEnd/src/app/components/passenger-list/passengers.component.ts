import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { Passenger } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import { PassengerFilter } from 'src/app/models/passengerFilter';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

  constructor(private passengerService:PassengerService,private router:Router) { }

  ngOnInit(): void {
    this.getAllPassengers();
  }

  passengers:Passenger[]=[];
  filteredPassengers:Passenger[]=[];
  selectedPassenger?: Passenger;
  filter:PassengerFilter={
    id:"",
    firstMidName:"",
    lastName:"",
    dob:"",
    email:"",
    job:""

  }

    getAllPassengers():void{
      this.passengerService.getAllPassengers().subscribe(passengers=>{
        this.passengers=passengers;
        this.filteredPassengers=this.passengers;
      });
      }

    deletePassenger(id:number):void{
    
      this.passengerService.deletePassenger(id).subscribe({next:(res)=>{
        console.log(res);
        this.router.navigate(['/passengers']).then(() => {
          location.reload();
      });
      }})
    }

    filterPassengers():void{
      console.log("this is firing")
      if(this.filter.firstMidName!=""){
        this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
        passenger.firstMidName.includes(this.filter.firstMidName))
      }
      if(this.filter.id!=""){
        this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
        String(passenger.id).includes(this.filter.id))
      }
      if(this.filter.lastName!=""){
        this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
        String(passenger.lastName).includes(this.filter.lastName))
      }
      if(this.filter.dob!=""){
        this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
        String(passenger.dob).includes(this.filter.dob))
      }
      if(this.filter.email!=""){
        this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
        String(passenger.email).includes(this.filter.email))
      }
      if(this.filter.job!=""){
        this.filteredPassengers=this.filteredPassengers.filter((passenger)=>
        String(passenger.job).includes(this.filter.job))
      }
    }
    resetPassengers():void{
      this.filteredPassengers=this.passengers;
      this.filter={
        id:"",
        firstMidName:"",
        lastName:"",
        dob:"",
        email:"",
        job:"",
      };
    }
  
}
