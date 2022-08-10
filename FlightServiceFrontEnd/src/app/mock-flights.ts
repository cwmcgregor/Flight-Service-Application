import { Flight } from "./models/flight";

export const MOCKFLIGHTS:Flight[]=[
    {       
        id:4,
        flightNumber:'DLT816',
        DepartureAirport:'LAX',
        DepartureDateTime: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        ArrivalAirport: 'JFK',
        ArrivalDateTime: new Date(2018, 0O5, 0O5, 21, 23, 42, 11),
        MaxCapacity:100,
        seatsReserved:12
    },
        {
            id:5,
            flightNumber:'DLT817',
            DepartureAirport:'LAX',
            DepartureDateTime: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
            ArrivalAirport: 'ORD',
            ArrivalDateTime: new Date(2018, 0O5, 0O5, 20, 23, 42, 11),
            MaxCapacity:112,
            seatsReserved:112
        },
        {
        id:6,
        flightNumber:'DLT822',
        DepartureAirport:'LAX',
        DepartureDateTime: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        ArrivalAirport: 'DEN',
        ArrivalDateTime: new Date(2018, 0O5, 0O5, 19, 23, 42, 11),
        MaxCapacity:80,
        seatsReserved:60
        }
]