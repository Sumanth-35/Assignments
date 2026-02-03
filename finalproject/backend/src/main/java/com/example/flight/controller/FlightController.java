package com.example.flight.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.flight.model.Flight;
import com.example.flight.service.FlightService;

@RestController
@RequestMapping("/flights")
@CrossOrigin(origins = "http://localhost:3000")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @PostMapping("/add")
    public Flight addFlight(@RequestBody Flight flight) {
        return flightService.saveFlight(flight);
    }

    @GetMapping("/getAll")
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/{id}")
    public Flight getFlight(@PathVariable Long id) {
        return flightService.getFlightById(id);
    }

    @PutMapping("/{id}")
    public Flight updateFlight(@PathVariable Long id, @RequestBody Flight flight) {
        return flightService.updateFlight(id, flight);
    }

    @DeleteMapping("/{id}")
    public void deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
    }
}