
using Microsoft.EntityFrameworkCore;
using FlightServiceBackEnd.Models;

namespace FlightServiceBackEnd.Data
{
    public class FlightDbContext : DbContext
    {
        public FlightDbContext(DbContextOptions<FlightDbContext>options):base(options)
        {

        }
        public DbSet<Flight> Flights { get; set; }
    }
}
