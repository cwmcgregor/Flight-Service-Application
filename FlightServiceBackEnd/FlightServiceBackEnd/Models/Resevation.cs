using System.ComponentModel.DataAnnotations;

namespace FlightServiceBackEnd.Models
{
    public class Resevation
    {
        [Key]
        public int Id { get; set; }
        public int PassengerId { get; set; }
        public int FlightId { get; set; }

        public virtual Passenger? Passenger { get; set; }
        public virtual Flight? Flight { get; set; }
       
       
    }
}
