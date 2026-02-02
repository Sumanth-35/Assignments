import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html'
})
export class ManageFlightsComponent implements OnInit {

  flights: Flight[] = [];
  editFlightId: number | null = null;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.flights = this.flightService.getFlights();
  }

  deleteFlight(id: number) {
    this.flightService.deleteFlight(id);
    this.loadFlights(); // ✅ refresh UI
  }

  markOnTime(id: number) {
    this.flightService.updateStatus(id, 'On Time');
    this.loadFlights();
  }

  markDelayed(id: number) {
    this.flightService.updateStatus(id, 'Delayed');
    this.loadFlights();
  }

  cancelFlight(id: number) {
    this.flightService.updateStatus(id, 'Cancelled');
    this.loadFlights();
  }

  enableEdit(id: number) {
    this.editFlightId = id;
  }

  saveEdit(flight: Flight) {
    this.flightService.updateFlight(flight);
    this.editFlightId = null;
    this.loadFlights();
  }
}
