package com.example.flight.component;

import com.example.flight.model.Flight;
import com.example.flight.repository.FlightRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

@Component
public class CsvDataLoader implements CommandLineRunner {

    @Autowired
    private FlightRepository flightRepository;

    @Override
    public void run(String... args) throws Exception {
        if (flightRepository.count() == 0) {
            loadFlightsFromCsv();
        }
    }

    private void loadFlightsFromCsv() {
        try (Reader reader = new InputStreamReader(new ClassPathResource("flights.csv").getInputStream());
             CSVReader csvReader = new CSVReader(reader)) {

            String[] header = csvReader.readNext(); // Skip header
            String[] line;
            while ((line = csvReader.readNext()) != null) {
                // Mapping matches previous implementation based on CSV structure
                if (line.length > 20) {
                    Flight flight = new Flight();
                    flight.setSource(line[13]); // origin
                    flight.setDestination(line[14]); // dest
                    flight.setFlightName(line[20]); // name
                    
                    flightRepository.save(flight);
                }
            }
            System.out.println("Flights data loaded successfully.");

        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
    }
}
