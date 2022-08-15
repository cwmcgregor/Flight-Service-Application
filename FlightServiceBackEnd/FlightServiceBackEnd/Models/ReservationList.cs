namespace FlightServiceBackEnd.Models
{
    public class ReservationList
    {
        public int Id { get; set; }
        public int PassengerId { get; set; }
        public string FirstMidName { get; set; }
        public string LastName { get; set; }
        public int FlightId { get; set; }
        public string FlightNumber { get; set; }
        public DateTime DepartureDateTime { get; set; }
        public DateTime ArrivalDateTime { get; set; }
        public string DepartureAirport { get; set; }
        public string ArrivalAirport { get; set; }
        public int MaxCapacity { get; set; }
        public int SeatsReserved { get; set; }

    }
}
