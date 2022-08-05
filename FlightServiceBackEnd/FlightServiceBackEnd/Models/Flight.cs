﻿using System.ComponentModel.DataAnnotations;

namespace FlightServiceBackEnd.Models
{
    public class Flight
    {
        [Key]
        public int Flight_Id { get; set; }
        public string FlightNumber { get; set; }
        public DateTime DepartureDateTime { get; set; }
        public DateTime ArrivalDateTime { get; set; }
        public string DepartureAirport { get; set; }
        public string ArrivalAirport { get; set; }
        public int MaxCapacity { get; set; }

    }
}
