import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {
  const [flightName, setFlightName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const saveFlight = async (e) => {
    e.preventDefault();
    const newFlight = {
      flightName,
      airline: flightName,
      source,
      origin: source,
      destination,
      price: parseFloat(price) || 300,
      id: Date.now()
    };

    // Save to local storage always (resilience)
    const existing = JSON.parse(localStorage.getItem('local_flights') || '[]');
    localStorage.setItem('local_flights', JSON.stringify([...existing, newFlight]));

    await postFlight(newFlight);
  };

  const postFlight = async (flightData) => {
    try {
      const response = await fetch("http://localhost:8080/flights/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flightData)
      });
      if (response.ok) {
        if (!csvFile) navigate("/admin"); // Only navigate if single add
        return true;
      } else {
        // If server fails, we still saved locally, so technically "success" for the user
        if (!csvFile) navigate("/admin");
        return false;
      }
    } catch (err) {
      // Offline mode handling
      if (!csvFile) navigate("/admin");
      return false;
    }
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const idx = {
      carrier: headers.indexOf('carrier'),
      flight: headers.indexOf('flight'),
      origin: headers.indexOf('origin'),
      dest: headers.indexOf('dest'),
      distance: headers.indexOf('distance'),
      air_time: headers.indexOf('air_time')
    };

    if (idx.carrier === -1 || idx.flight === -1 || idx.origin === -1 || idx.dest === -1) {
      setUploadStatus("Error: CSV missing required columns (carrier, flight, origin, dest)");
      return [];
    }

    const flights = [];
    const limit = 10000; // Increased limit to support full dataset
    for (let i = 1; i < Math.min(lines.length, limit + 1); i++) {
      const row = lines[i].split(',');
      if (row.length < headers.length) continue;

      const carrier = row[idx.carrier];
      const flightNum = row[idx.flight];
      const origin = row[idx.origin];
      const dest = row[idx.dest];
      const dist = parseFloat(row[idx.distance]) || 1000;

      const airTime = parseFloat(row[idx.air_time || -1]);
      const duration = airTime ? `${Math.floor(airTime / 60)}h ${airTime % 60}m` : "4h 00m";

      flights.push({
        id: Date.now() + i, // Generate unique local ID
        flightName: `${carrier} ${flightNum}`,
        airline: `${carrier} ${flightNum}`,
        source: origin,
        origin: origin,
        destination: dest,
        price: Math.round(dist * 0.15),
        duration: duration
      });
    }
    return flights;
  };

  const handleUpload = async () => {
    if (!csvFile) return;
    setUploadStatus("Reading file...");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const flights = parseCSV(text);

      if (flights.length === 0) {
        setUploadStatus("No valid flights found in CSV.");
        return;
      }

      setUploadStatus(`Importing ${flights.length} flights...`);

      // Save entire batch to local storage
      const existing = JSON.parse(localStorage.getItem('local_flights') || '[]');
      const updated = [...existing, ...flights];
      localStorage.setItem('local_flights', JSON.stringify(updated));

      // Attempt backend sync (optional/fire-and-forget)
      let synced = 0;
      for (const flight of flights) {
        const success = await postFlight(flight);
        if (success) synced++;
      }

      setUploadStatus(`Import Complete. Added ${flights.length} flights to dashboard (${synced} synced to server).`);
    };
    reader.readAsText(csvFile);
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '500px' }}>
        <h3 className="mb-4 text-center">Add New Flight</h3>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        {uploadStatus && <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>{uploadStatus}</div>}

        <div className="mb-4" style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <label className="form-label">Bulk Upload (CSV)</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="file" accept=".csv" onChange={handleFileChange} className="form-input" />
            <button type="button" onClick={handleUpload} className="btn btn-primary" disabled={!csvFile}>Upload</button>
          </div>
          <small style={{ color: '#666' }}>Format: flights.csv (Limit: first 50)</small>
        </div>

        <div style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold' }}>OR</div>

        <form onSubmit={saveFlight}>
          <div className="form-group">
            <label className="form-label">Flight Name / Airline</label>
            <input
              className="form-input"
              placeholder="e.g. Delta DL123"
              value={flightName}
              onChange={e => setFlightName(e.target.value)}
              required={!csvFile}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Source</label>
            <input
              className="form-input"
              placeholder="Origin City"
              value={source}
              onChange={e => setSource(e.target.value)}
              required={!csvFile}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Destination</label>
            <input
              className="form-input"
              placeholder="Destination City"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              required={!csvFile}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-input"
              placeholder="000"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ flex: 1 }}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={!!csvFile}>
              Save Single
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;