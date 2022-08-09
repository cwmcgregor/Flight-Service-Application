namespace FlightServiceBackEnd.Models
{
    public class FlightReservation
    {
        private object id;
        private object value;

        public int reservationID { get; set; }
        public string flightNumber { get; set; }
        public string departureAirport { get; set; }
        public DateTime departureDateTime { get; set; }
        public string arrivalAirport { get; set; }
        public DateTime arrivalDateTime { get; set; }

        public FlightReservation(int reservationID, string flightNumber, string departureAirport, DateTime departureDateTime, string arrivalAirport, DateTime arrivalDateTime)
        {
            this.reservationID = reservationID;
            this.flightNumber = flightNumber;
            this.departureAirport = departureAirport;
            this.departureDateTime = departureDateTime;
            this.arrivalAirport = arrivalAirport;
            this.arrivalDateTime = arrivalDateTime;
        }

        public FlightReservation()
        {
            
        }
    }
}
