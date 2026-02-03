package com.example.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.flight.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}