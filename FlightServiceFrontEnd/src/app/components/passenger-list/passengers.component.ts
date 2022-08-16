import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { Passenger } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';

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
  selectedPassenger?: Passenger;

    getAllPassengers():void{
      this.passengerService.getAllPassengers().subscribe(passengers=>this.passengers=passengers);
    }

    deletePassenger(id:number):void{
    
      this.passengerService.deletePassenger(id).subscribe({next:(res)=>{
        console.log(res);
        this.router.navigate(['/passengers']).then(() => {
          location.reload();
      });
      }})
    }
  
}
