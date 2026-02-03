import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights: Flight[] = [
    {
      id: 1,
      flightNo: 'AI101',
      airline: 'Indigo',
      source: 'DEL',
      destination: 'MUM',
      time: '10:30 AM',
      price: 4500,
      status: 'On Time'
    }
  ];

  getFlights(): Flight[] {
    return this.flights;
  }

  addFlight(flight: Flight) {
    this.flights.push(flight);
  }

  deleteFlight(id: number) {
    this.flights = this.flights.filter(f => f.id !== id);
  }

  updateStatus(id: number, status: string) {
    const flight = this.flights.find(f => f.id === id);
    if (flight) {
      flight.status = status;
    }
  }

  updateFlight(updatedFlight: Flight) {
    const index = this.flights.findIndex(f => f.id === updatedFlight.id);
    if (index !== -1) {
      this.flights[index] = updatedFlight;
    }
  }
}

