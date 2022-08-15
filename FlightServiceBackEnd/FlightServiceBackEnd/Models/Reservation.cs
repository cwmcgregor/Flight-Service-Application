using System.ComponentModel.DataAnnotations;

namespace FlightServiceBackEnd.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        public int PassengerId { get; set; }
        public int FlightId { get; set; }

       
       
       
    }
}
