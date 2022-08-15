import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationList } from 'src/app/models/reservationList';
import { Flight } from 'src/app/models/flight';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private reservationService:ReservationService, private router:Router) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  reservations:ReservationList[]=[];
  selectedReservation?: Reservation;

    getAllReservations():void{
      this.reservationService.getAllReservations().subscribe(reservations=>this.reservations=reservations);
    }

   

    deleteReservation(id:number):void{
      
      this.reservationService.deleteReservation(id).subscribe({next:(res)=>{
        console.log(res);
        this.router.navigate(['/reservations']);
      }})
    }
  
}

