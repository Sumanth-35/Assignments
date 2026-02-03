import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html'
})
export class AddFlightComponent {

  newFlight: Flight = {
    id: 0,
    flightNo: '',
    airline: '',
    source: '',
    destination: '',
    time: '',
    price: 0,
    status: 'On Time'
  };

  constructor(private flightService: FlightService) {}

  addFlight() {
    this.newFlight.id = Date.now(); // unique id
    this.flightService.addFlight({ ...this.newFlight });

    alert('Flight Added Successfully ✅');

    // reset form
    this.newFlight = {
      id: 0,
      flightNo: '',
      airline: '',
      source: '',
      destination: '',
      time: '',
      price: 0,
      status: 'On Time'
    };
  }
}
