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
    public class ReservationsController : ControllerBase
    {
        private readonly FlightDbContext _context;

        public ReservationsController(FlightDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        //{
        //  if (_context.Reservations == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.Reservations.ToListAsync();
        //}

        // GET: api/Reservations
        [HttpGet]
        public async Task<List<ReservationList>> GetReservationsList()
        {
            var resList = from reservation in _context.Reservations
                          join passenger in _context.Passengers on reservation.PassengerId equals passenger.Id
                          join flight in _context.Flights on reservation.FlightId equals flight.Id
                          select new
                          {
                              reservation.Id,
                              passenger.FirstMidName,
                              passenger.LastName,
                              flight.FlightNumber,
                              flight.DepartureAirport,
                              flight.DepartureDateTime,
                              flight.ArrivalAirport,
                              flight.ArrivalDateTime
                          };

            var list=await resList.ToListAsync().ConfigureAwait(false);

            return list.Select(r=> new ReservationList()
            {
                Id=r.Id,
                FirstMidName=r.FirstMidName,
                LastName=r.LastName,
                FlightNumber=r.FlightNumber,
                DepartureAirport=r.DepartureAirport,
                DepartureDateTime=r.DepartureDateTime,
                ArrivalAirport=r.ArrivalAirport,
                ArrivalDateTime=r.ArrivalDateTime
            }).ToList();
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // PUT: api/Reservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            
          if (_context.Reservations == null)
          {
              return Problem("Entity set 'FlightDbContext.Reservations'  is null.");
          }
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (_context.Reservations == null)
            {
                return NotFound();
            }
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return (_context.Reservations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
