export interface Flight {
    id: number;
    flightNumber: string;
    DepartureAirport:string;
    DepartureDateTime: Date;
    ArrivalAirport:string;
    ArrivalDateTime:Date;
    MaxCapacity:number;
    seatsReserved:number;
    
  }