export interface FlightReservation {
    reservationID: number;
    flightNumber: string;
    departureAirport:string;
    departureDateTime: Date;
    arrivalAirport:string;
    arrivalDateTime:Date;  
  }