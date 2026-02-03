export const loadFlightsFromCSV = async () => {
    try {
        // 1. Try to load uploaded CSV data from Local Storage (Manual Uploads override defaults)
        const localData = localStorage.getItem('local_flights');
        let localFlights = [];

        if (localData) {
            try { localFlights = JSON.parse(localData); } catch (e) { console.error("Error parsing local flights:", e); }
        }

        // 2. Try to fetch from Backend (if running - for real-time updates)
        let backendFlights = [];
        try {
            const response = await fetch("http://localhost:8080/flights/getAll");
            if (response.ok) {
                const data = await response.json();
                backendFlights = data.map(f => ({
                    id: f.id,
                    airline: f.flightName || "Unknown Airline",
                    flightNumber: `FL-${f.id}`,
                    origin: f.source,
                    destination: f.destination,
                    departureTime: new Date().toISOString(),
                    arrivalTime: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(),
                    price: f.price || 300,
                    duration: "4h 00m"
                }));
            }
        } catch (err) {
            // Backend silent failure expected in offline mode
        }

        // 3. Merge Backend + Local (Local takes precedence if duplicates, but here we just append)
        let allFlights = [...backendFlights, ...localFlights];

        // 4. Default: Load from static CSV (Always attempt to load it to ensure we have base data)
        // We filter out duplicates later if needed, but for now we prioritize showing data.
        let csvFlights = [];
        try {
            const response = await fetch("/flights.csv");
            if (response.ok) {
                const text = await response.text();
                const lines = text.split('\n').filter(line => line.trim() !== '');
                if (lines.length > 1) {
                    const headers = lines[0].split(',').map(h => h.trim());
                    const idx = {
                        carrier: headers.indexOf('carrier'),
                        flight: headers.indexOf('flight'),
                        origin: headers.indexOf('origin'),
                        dest: headers.indexOf('dest'),
                        distance: headers.indexOf('distance'),
                        air_time: headers.indexOf('air_time')
                    };

                    if (idx.carrier > -1) {
                        const limit = 2000;
                        csvFlights = lines.slice(1, limit + 1).map((line, i) => {
                            const row = line.split(',');
                            if (row.length < headers.length) return null;

                            const dist = parseFloat(row[idx.distance]) || 1000;
                            const airTime = parseFloat(row[idx.air_time]);
                            const duration = !isNaN(airTime) ? `${Math.floor(airTime / 60)}h ${airTime % 60}m` : "4h 30m";

                            return {
                                id: `csv-${i}`,
                                airline: `${row[idx.carrier]} ${row[idx.flight]}`.trim(),
                                flightNumber: row[idx.flight],
                                origin: row[idx.origin],
                                destination: row[idx.dest],
                                price: Math.round(dist * 0.15),
                                duration: duration,
                                departureTime: new Date().toISOString(),
                                arrivalTime: new Date(Date.now() + (airTime ? airTime * 60000 : 14400000)).toISOString()
                            };
                        }).filter(f => f !== null);
                    }
                }
            }
        } catch (err) {
            console.warn("Could not load default flights.csv", err);
        }

        // Merge: Backend + Local + CSV
        // We use a Map to prevent duplicates based on ID, but prioritize Local/Backend over CSV if IDs conflict
        const flightMap = new Map();
        [...csvFlights, ...backendFlights, ...localFlights].forEach(f => {
            // Basic validation before adding
            if (f && f.airline && f.origin && f.destination && f.airline.trim() !== "" && f.origin.trim() !== "") {
                flightMap.set(f.id.toString(), f);
            }
        });

        const validFlights = Array.from(flightMap.values());

        if (validFlights.length === 0) {
            return [];
        }

        return validFlights;

    } catch (error) {
        console.error("loadFlightsFromCSV failed:", error);
        return [];
    }
};
