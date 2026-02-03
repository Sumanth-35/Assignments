import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
    const { state } = useLocation();

    if (!state) {
        return <div className="container text-center"><p>No booking found.</p></div>;
    }

    const { flight, passenger, paymentId } = state;

    return (
        <div className="container text-center" style={{ paddingTop: '2rem' }}>
            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
                <div style={{ color: 'var(--success)', fontSize: '5rem', marginBottom: '1rem' }}>✓</div>
                <h1 className="mb-4">Booking Confirmed!</h1>
                <p>Thank you for booking with SkyBooker.</p>
                <div style={{ background: '#f0fdf4', color: '#15803d', padding: '1rem', borderRadius: '0.5rem', margin: '2rem 0' }}>
                    <strong>Booking Reference: {paymentId}</strong>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <h3 className="mb-4">Itinerary</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{flight.origin}</p>
                            <p style={{ color: 'var(--text-muted)' }}>{new Date(flight.departureTime).toLocaleDateString()}</p>
                        </div>
                        <div style={{ alignSelf: 'center' }}>➝</div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{flight.destination}</p>
                            <p style={{ color: 'var(--text-muted)' }}>{new Date(flight.arrivalTime).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p><strong>Passenger:</strong> {passenger.firstName} {passenger.lastName}</p>
                    <p><strong>Flight:</strong> {flight.airline} {flight.flightNumber}</p>
                </div>

                <Link to="/dashboard" className="btn btn-primary">Book Another Flight</Link>
            </div>
        </div>
    );
};

export default Confirmation;
