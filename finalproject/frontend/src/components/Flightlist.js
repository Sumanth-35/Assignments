import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadFlightsFromCSV } from "../data/LoadFlights";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFlightsFromCSV()
      .then(data => {
        setFlights(data);
        if (data.length === 0) {
          setError("Could not load flights. Is the backend server running?");
        }
      })
      .catch(err => {
        console.error("Error loading flights:", err);
        setError("Failed to load flight data.");
      });
  }, []);

  const deleteFlight = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;

    try {
      // Try backend delete
      const res = await fetch(`http://localhost:8080/flights/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Backend delete failed");
    } catch (err) {
      console.warn("Backend delete failed, performing local soft delete.");
      // Soft delete: Save ID to local storage
      const deleted = JSON.parse(localStorage.getItem('deleted_flights') || '[]');
      if (!deleted.includes(id.toString())) {
        deleted.push(id.toString());
        localStorage.setItem('deleted_flights', JSON.stringify(deleted));
      }
    }

    // Update UI
    setFlights(flights.filter(f => f.id !== id));
  };

  return (
    <div className="page container">
      <div className="admin-header">
        <h2>Flight Management</h2>
        <Link to="/admin/add" className="btn btn-primary">
          + Add New Flight
        </Link>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Airline / Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(f => (
              <tr key={f.id}>
                <td>#{f.id}</td>
                <td style={{ fontWeight: 600, color: "var(--primary)" }}>
                  {f.airline || f.flightName}
                </td>
                <td>{f.origin || f.source}</td>
                <td>{f.destination}</td>
                <td>
                  <div className="admin-actions">
                    <Link
                      to={`/admin/edit/${f.id}`}
                      className="btn-edit"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteFlight(f.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightList;