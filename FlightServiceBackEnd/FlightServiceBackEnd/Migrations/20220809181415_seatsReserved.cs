using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightServiceBackEnd.Migrations
{
    public partial class seatsReserved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "seatsReserved",
                table: "Flights",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "seatsReserved",
                table: "Flights");
        }
    }
}
