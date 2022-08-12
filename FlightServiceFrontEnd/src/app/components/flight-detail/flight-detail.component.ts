import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';


@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  @Input() flight?: Flight;
  constructor(private route: ActivatedRoute, private flightService: FlightService, private location:Location, private router:Router) { }

  ngOnInit(): void {
    this.getFlight();
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
  
}
