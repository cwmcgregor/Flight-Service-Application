using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightServiceBackEnd.Data;
using FlightServiceBackEnd.Models;

namespace FlightServiceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly FlightDbContext _context;

        public PassengersController(FlightDbContext context)
        {
            _context = context;
        }

        // GET: api/Passengers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengers()
        {
          if (_context.Passengers == null)
          {
              return NotFound();
          }
            return await _context.Passengers.ToListAsync();
        }

        // GET: api/Passengers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passenger>> GetPassenger(int id)
        {
          if (_context.Passengers == null)
          {
              return NotFound();
          }
            var passenger = await _context.Passengers.FindAsync(id);

            if (passenger == null)
            {
                return NotFound();
            }

            return passenger;
        }

    

        // GET: api/Passengers/5/Reservations
        [HttpGet("{id}/Reservations")]
        public async Task<List<FlightReservation>> GetPassengerReservations(int id)
        {

            var passengerReservations = from flight in _context.Flights
                                        join reservation in _context.Reservations on flight.Id equals reservation.FlightId
                                        where reservation.PassengerId == id
                                        select new
                                        {
                                            reservation.Id,
                                            flight.FlightNumber,
                                            flight.DepartureAirport,
                                            flight.DepartureDateTime,
                                            flight.ArrivalAirport,
                                            flight.ArrivalDateTime
                                          
                                        };
                                           
                                                
            var list=await passengerReservations.ToListAsync().ConfigureAwait(false);

            return list.Select(r => new FlightReservation()
            {
                reservationID=r.Id,
                flightNumber=r.FlightNumber,
                departureAirport=r.DepartureAirport,
                departureDateTime=r.DepartureDateTime,
                arrivalAirport=r.ArrivalAirport,
                arrivalDateTime=r.ArrivalDateTime
            }).ToList();
            ;

        }

        // PUT: api/Passengers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassenger(int id, Passenger passenger)
        {
            if (id != passenger.Id)
            {
                return BadRequest();
            }

            _context.Entry(passenger).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Passengers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passenger>> PostPassenger(Passenger passenger)
        {
          if (_context.Passengers == null)
          {
              return Problem("Entity set 'FlightDbContext.Passengers'  is null.");
          }
            _context.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassenger", new { id = passenger.Id }, passenger);
        }

        // DELETE: api/Passengers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            if (_context.Passengers == null)
            {
                return NotFound();
            }
            var passenger = await _context.Passengers.FindAsync(id);
            if (passenger == null)
            {
                return NotFound();
            }

            _context.Passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassengerExists(int id)
        {
            return (_context.Passengers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
