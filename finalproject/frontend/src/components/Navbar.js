import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Simple dummy auth check (localStorage)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            marginBottom: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                }}>
                    ✈
                </div>
                <h2 style={{ fontSize: '1.5rem', background: 'linear-gradient(to right, #4f46e5, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>SkyBooker</h2>
            </Link>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="btn btn-secondary" style={{ border: 'none', background: 'transparent' }}>Dashboard</Link>
                        <Link to="/admin" className="btn btn-secondary" style={{ border: 'none', background: 'transparent' }}>Admin</Link>
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </>
                ) : (
                    <>
                        {location.pathname !== '/login' && <Link to="/login" className="btn btn-primary">Login</Link>}
                        {location.pathname !== '/register' && <Link to="/register" className="btn btn-secondary">Register</Link>}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
