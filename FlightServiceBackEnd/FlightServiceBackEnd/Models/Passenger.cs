using System.ComponentModel.DataAnnotations;

namespace FlightServiceBackEnd.Models
{
    public class Passenger
    {
        [Key]
        public int Passenger_Id { get; set; }
        public string FirstMidName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Nationality { get; set; }
    }
}
