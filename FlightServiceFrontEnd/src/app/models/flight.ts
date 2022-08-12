export interface Flight {
    id: number;
    flightNumber: string;
    departureAirport:string;
    departureDateTime: Date;
    arrivalAirport:string;
    arrivalDateTime:Date;
    maxCapacity:number;
    seatsReserved:number;
    
  }