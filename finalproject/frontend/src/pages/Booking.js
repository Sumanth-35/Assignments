import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const flight = state?.flight;

    const [passenger, setPassenger] = useState({
        firstName: '',
        lastName: '',
        email: '',
        passport: '',
        age: ''
    });

    if (!flight) {
        return <div className="container text-center"><p>No flight selected.</p></div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Passing data to payment
        navigate('/payment', { state: { flight, passenger } });
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <h2 className="mb-4">Passenger Details</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 className="mb-4">Flight Summary</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <p className="form-label">Flight</p>
                        <p style={{ fontWeight: 'bold' }}>{flight.airline} ({flight.flightNumber})</p>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <p className="form-label">Route</p>
                        <p>{flight.origin} → {flight.destination}</p>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <p className="form-label">Total Price</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>${flight.price}</p>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-input"
                                required
                                value={passenger.firstName}
                                onChange={(e) => setPassenger({ ...passenger, firstName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-input"
                                required
                                value={passenger.lastName}
                                onChange={(e) => setPassenger({ ...passenger, lastName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                required
                                value={passenger.email}
                                onChange={(e) => setPassenger({ ...passenger, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Passport Number</label>
                            <input
                                type="text"
                                className="form-input"
                                required
                                value={passenger.passport}
                                onChange={(e) => setPassenger({ ...passenger, passport: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Age</label>
                            <input
                                type="number"
                                className="form-input"
                                required
                                min="0"
                                value={passenger.age}
                                onChange={(e) => setPassenger({ ...passenger, age: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
                            Proceed to Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
