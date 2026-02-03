import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flightName, setFlightName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Determine if we should try backend or local first. 
    // Actually, loadFlightsFromCSV handles the priority for us!
    import("../data/LoadFlights").then(module => {
      module.loadFlightsFromCSV().then(flights => {
        const found = flights.find(f => f.id.toString() === id.toString());
        if (found) {
          setFlightName(found.airline || found.flightName || ""); // Handle both naming conventions
          setSource(found.origin || found.source || "");
          setDestination(found.destination || found.destination || ""); // Typo in original? No.
          setPrice(found.price || "");
          setLoading(false);
        } else {
          // Fallback to direct backend fetch if oddly not in the list (rare)
          fetch(`http://localhost:8080/flights/${id}`)
            .then(res => res.json())
            .then(data => {
              setFlightName(data.flightName || "");
              setSource(data.source || "");
              setDestination(data.destination || "");
              setPrice(data.price || "");
              setLoading(false);
            })
            .catch(err => {
              setError("Could not load flight data.");
              setLoading(false);
            });
        }
      });
    });
  }, [id]);

  const updateFlight = async (e) => {
    e.preventDefault();
    try {
      // Try backend update first
      const res = await fetch(`http://localhost:8080/flights/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightName, source, destination, price })
      });
      if (!res.ok) throw new Error("Backend update failed");
    } catch (err) {
      console.warn("Backend update failed, saving locally.");

      // Local Override: Save to local_flights
      const existing = JSON.parse(localStorage.getItem('local_flights') || '[]');
      // Remove old version of this flight if it exists in local storage
      const filtered = existing.filter(f => f.id.toString() !== id.toString());

      const updatedFlight = {
        id: id,
        airline: flightName,
        flightName,
        origin: source,
        source,
        destination,
        price: parseFloat(price),
        duration: existing.find(f => f.id.toString() === id.toString())?.duration || "4h 00m"
      };

      localStorage.setItem('local_flights', JSON.stringify([...filtered, updatedFlight]));
    }

    navigate("/admin");
  };

  if (loading) return <div className="container text-center pt-5">Loading...</div>;

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '500px' }}>
        <h3 className="mb-4 text-center">Edit Flight</h3>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={updateFlight}>
          <div className="form-group">
            <label className="form-label">Flight Name / Airline</label>
            <input
              className="form-input"
              value={flightName}
              onChange={e => setFlightName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Source</label>
            <input
              className="form-input"
              value={source}
              onChange={e => setSource(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Destination</label>
            <input
              className="form-input"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              className="form-input"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlight;