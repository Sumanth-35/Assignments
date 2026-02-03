import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadFlightsFromCSV } from "../data/LoadFlights";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('price');
    const [allFlights, setAllFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadFlightsFromCSV()
            .then(data => {
                setAllFlights(data);
                setFilteredFlights(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Could not load flights.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let results = allFlights.filter(flight =>
            (flight.origin?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (flight.destination?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (flight.airline?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );

        results.sort((a, b) => {
            if (sortBy === 'price') {
                return a.price - b.price;
            } else if (sortBy === 'duration') {
                return 0; // Duration sort simplified for mixed data
            }
            return 0;
        });

        setFilteredFlights(results);
    }, [searchTerm, sortBy, allFlights]);

    if (loading) return <div className="container text-center pt-5">Loading flights...</div>;

    return (
        <div className="page">
            {error && <div className="text-center" style={{ color: 'orange', marginBottom: '1rem' }}>{error} (Displaying demo data)</div>}

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.8rem' }}>Available Flights</h2>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search origin, destination..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ minWidth: '250px' }}
                        />

                        <select
                            className="form-input"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{ width: 'auto' }}
                        >
                            <option value="price">Sort by Price</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filteredFlights.map(flight => (
                    <div key={flight.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="flex-between">
                            <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{flight.airline}</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{flight.flightNumber}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem' }}>{(flight.origin || "").split(' ')[0]}</h3>
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>➝ {flight.duration} ➝</div>
                            <div style={{ textAlign: 'right' }}>
                                <h3 style={{ fontSize: '1.5rem' }}>{(flight.destination || "").split(' ')[0]}</h3>
                            </div>
                        </div>

                        <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>${flight.price}</span>
                            <Link to={`/flight/${flight.id}`} state={{ flight }} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}

                {filteredFlights.length === 0 && (
                    <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center' }}>
                        <h3>No flights found matching your search.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
