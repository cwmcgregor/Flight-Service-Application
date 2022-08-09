using System.ComponentModel.DataAnnotations;

namespace FlightServiceBackEnd.Models
{
    public class Passenger
    {
        [Key]
        public int Id { get; set; }
        public string FirstMidName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Job { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Reservation>? Resevations { get; set; }
    }
}
