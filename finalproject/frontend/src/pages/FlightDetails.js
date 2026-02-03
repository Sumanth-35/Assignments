import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { loadFlightsFromCSV } from "../data/LoadFlights";

const FlightDetails = () => {
    const { state } = window.location;
    const { id } = useParams();
    const navigate = useNavigate();
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // ✅ FIRST: use state passed from Dashboard
        if (state?.flight) {
            setFlight(state.flight);
            setLoading(false);
            return;
        }

        // ❌ Backend fallback (replaced with local lookup)
        loadFlightsFromCSV().then(flights => {
            const found = flights.find(f => f.id.toString() === id.toString());
            if (found) {
                setFlight(found);
                setLoading(false);
            } else {
                // If not found in CSV, try backend as last resort or error
                fetch(`http://localhost:8080/flights/${id}`)
                    .then(res => {
                        if (!res.ok) throw new Error("Flight not found");
                        return res.json();
                    })
                    .then(data => {
                        setFlight({
                            id: data.id,
                            airline: data.flightName || "Unknown Airline",
                            flightNumber: `FL-${data.id}`,
                            origin: data.source,
                            destination: data.destination,
                            departureTime: new Date().toISOString(),
                            arrivalTime: new Date(Date.now() + 14400000).toISOString(),
                            price: data.price || 300,
                            duration: "4h 00m"
                        });
                        setLoading(false);
                    })
                    .catch(() => {
                        setError("Could not load flight details.");
                        setLoading(false);
                    });
            }
        });
    }, [id, state]);

    if (loading) return <div className="container text-center pt-5">Loading details...</div>;

    if (error || !flight) {
        return (
            <div className="container text-center" style={{ paddingTop: '4rem' }}>
                <h2>Flight not found</h2>
                <Link to="/dashboard" className="btn btn-secondary mt-4">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <Link to="/dashboard" className="btn btn-secondary mb-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                ← Back to Dashboard
            </Link>

            <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                <div className="flex-between mb-4">
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Flight Details</h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{flight.airline} &bull; {flight.flightNumber}</p>
                    </div>
                    <div className="text-center" style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '1rem' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Price per person</span>
                        <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>${flight.price}</span>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '2rem 0' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <p className="form-label">Departure</p>
                        <h3 style={{ fontSize: '1.8rem' }}>{flight.origin}</h3>
                        <p>{new Date(flight.departureTime).toLocaleString()}</p>
                    </div>
                    <div className="text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ fontWeight: 'bold' }}>{flight.duration}</p>
                        <div style={{ height: '2px', background: 'var(--text-muted)', width: '100%', position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '-4px', right: '0', fontSize: '1.5rem', lineHeight: '0' }}>▸</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Non-stop</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p className="form-label">Arrival</p>
                        <h3 style={{ fontSize: '1.8rem' }}>{flight.destination}</h3>
                        <p>{new Date(flight.arrivalTime).toLocaleString()}</p>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', background: '#f8fafc', marginBottom: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Baggage & Extras</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                        <li>1 Carry-on bag included</li>
                        <li>1 Checked bag included (23kg)</li>
                        <li>In-flight entertainment</li>
                        <li>Complimentary meal service</li>
                    </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => navigate('/booking', { state: { flight } })}
                        className="btn btn-primary"
                        style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
                    >
                        Book This Flight
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails;
