import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { ManageFlightsComponent } from './components/manage-flights/manage-flights.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'flights/:id', component: FlightDetailsComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'add-flight', component: AddFlightComponent },
      { path: 'manage-flights', component: ManageFlightsComponent }
    ]
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
