namespace FlightServiceBackEnd.Models
{
    public class PassengerReservation
    {
        public int ReservationId { get; set; }
        public string FirstMidName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Job { get; set; }
        public string Email { get; set; }
    }
}
