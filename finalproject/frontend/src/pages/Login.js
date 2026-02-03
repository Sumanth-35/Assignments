import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy validation
        if (formData.email && formData.password) {
            localStorage.setItem('isAuthenticated', 'true');
            // Store user info if needed
            localStorage.setItem('user', JSON.stringify({ email: formData.email }));
            navigate('/dashboard');
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div className="page page-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>Welcome Back</h2>
                <p className="text-center mb-4" style={{ marginBottom: '2rem' }}>Enter your credentials to access your flights.</p>

                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem', fontSize: '1rem', padding: '1rem' }}>
                        Sign In
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p style={{ fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
