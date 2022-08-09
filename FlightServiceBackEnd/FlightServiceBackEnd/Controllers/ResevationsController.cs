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
    public class ResevationsController : ControllerBase
    {
        private readonly FlightDbContext _context;

        public ResevationsController(FlightDbContext context)
        {
            _context = context;
        }

        // GET: api/Resevations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resevation>>> GetReservations()
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            return await _context.Reservations.ToListAsync();
        }

        // GET: api/Resevations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resevation>> GetResevation(int id)
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            var resevation = await _context.Reservations.FindAsync(id);

            if (resevation == null)
            {
                return NotFound();
            }

            return resevation;
        }

        // PUT: api/Resevations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResevation(int id, Resevation resevation)
        {
            if (id != resevation.Id)
            {
                return BadRequest();
            }

            _context.Entry(resevation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResevationExists(id))
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

        // POST: api/Resevations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Resevation>> PostResevation(Resevation resevation)
        {
          if (_context.Reservations == null)
          {
              return Problem("Entity set 'FlightDbContext.Reservations'  is null.");
          }
            _context.Reservations.Add(resevation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResevation", new { id = resevation.Id }, resevation);
        }

        // DELETE: api/Resevations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResevation(int id)
        {
            if (_context.Reservations == null)
            {
                return NotFound();
            }
            var resevation = await _context.Reservations.FindAsync(id);
            if (resevation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(resevation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResevationExists(int id)
        {
            return (_context.Reservations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
