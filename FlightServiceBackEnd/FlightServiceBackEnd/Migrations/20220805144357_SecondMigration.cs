using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightServiceBackEnd.Migrations
{
    public partial class SecondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Flights",
                newName: "Flight_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Flight_Id",
                table: "Flights",
                newName: "Id");
        }
    }
}
