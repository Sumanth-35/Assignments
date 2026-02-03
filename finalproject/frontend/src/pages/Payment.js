import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    if (!state || !state.flight) {
        return <div className="container text-center"><p>Session expired.</p></div>;
    }

    const { flight, passenger } = state;

    const handlePayment = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setProcessing(false);
            navigate('/confirmation', { state: { flight, passenger, paymentId: 'PAY-' + Math.floor(Math.random() * 1000000) } });
        }, 2000);
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className="glass-panel" style={{ padding: '3rem' }}>
                <h2 className="text-center mb-4">Secure Payment</h2>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                    <div className="flex-between">
                        <span>Passenger</span>
                        <span style={{ fontWeight: 'bold' }}>{passenger.firstName} {passenger.lastName}</span>
                    </div>
                    <div className="flex-between mt-4">
                        <span>Flight</span>
                        <span style={{ fontWeight: 'bold' }}>{flight.flightNumber}</span>
                    </div>
                    <div className="flex-between mt-4" style={{ fontSize: '1.2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                        <span>Amount Due</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${flight.price}</span>
                    </div>
                </div>

                <form onSubmit={handlePayment}>
                    <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-input" placeholder="0000 0000 0000 0000" required maxLength="19" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Expiry Date</label>
                            <input type="text" className="form-input" placeholder="MM/YY" required maxLength="5" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">CVC</label>
                            <input type="text" className="form-input" placeholder="123" required maxLength="3" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={processing}
                        style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}
                    >
                        {processing ? 'Processing...' : `Pay $${flight.price}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
