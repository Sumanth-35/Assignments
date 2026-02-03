package com.example.flight.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flight.model.Flight;
import com.example.flight.repository.FlightRepository;

@Service
public class FlightServiceImpl implements FlightService {

    private final FlightRepository repo;

    public FlightServiceImpl(FlightRepository repo) {
        this.repo = repo;
    }

    public Flight saveFlight(Flight flight) {
        return repo.save(flight);
    }

    public List<Flight> getAllFlights() {
        return repo.findAll();
    }

    public Flight getFlightById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public Flight updateFlight(Long id, Flight flight) {
        Flight existing = getFlightById(id);
        existing.setFlightName(flight.getFlightName());
        existing.setSource(flight.getSource());
        existing.setDestination(flight.getDestination());
        return repo.save(existing);
    }

    public void deleteFlight(Long id) {
        repo.deleteById(id);
    }
}