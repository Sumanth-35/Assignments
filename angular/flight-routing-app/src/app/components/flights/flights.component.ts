import { Component } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html'
})
export class FlightsComponent {

  flights = [
    { id: 101, flightNo: 'AI101' },
    { id: 202, flightNo: 'BA202' },
    { id: 303, flightNo: 'EM303' }
  ];
}
