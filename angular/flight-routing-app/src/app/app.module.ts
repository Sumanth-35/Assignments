import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { ManageFlightsComponent } from './components/manage-flights/manage-flights.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightsComponent,
    FlightDetailsComponent,
    AdminComponent,
    AddFlightComponent,
    ManageFlightsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
