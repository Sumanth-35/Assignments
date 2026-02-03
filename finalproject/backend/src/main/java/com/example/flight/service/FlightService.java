package com.example.flight.service;

import java.util.List;
import com.example.flight.model.Flight;

public interface FlightService {

    Flight saveFlight(Flight flight);

    List<Flight> getAllFlights();

    Flight getFlightById(Long id);

    Flight updateFlight(Long id, Flight flight);

    void deleteFlight(Long id);
}