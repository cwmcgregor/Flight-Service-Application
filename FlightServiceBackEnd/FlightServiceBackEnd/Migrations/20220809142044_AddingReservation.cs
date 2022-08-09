using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightServiceBackEnd.Migrations
{
    public partial class AddingReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Passenger_Id",
                table: "Passengers",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Flight_Id",
                table: "Flights",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Passengers",
                newName: "Passenger_Id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Flights",
                newName: "Flight_Id");
        }
    }
}
