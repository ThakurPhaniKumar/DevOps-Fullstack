import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = "http://localhost:5000/api";

export default function App() {
  const [view, setView] = useState('login'); // login, movies, history
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [movies] = useState([
    { id: 1, title: "They Call Him OG", poster: "https://via.placeholder.com/150", genre: "Action" },
    { id: 2, title: "Kantara", poster: "https://via.placeholder.com/150", genre: "Adventure" }
  ]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      setView('movies');
    } catch (err) { alert("Login failed"); }
  };

  const handleBooking = async (movieTitle) => {
    try {
      await axios.post(`${API}/bookings`, {
        movieTitle,
        theatre: "AMB Cinemas",
        seats: ["A1", "A2"],
        totalAmount: 400
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Ticket Booked!");
      setView('history');
    } catch (err) { alert("Booking failed"); }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#0a0e17', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h2>🎬 Just Now</h2>
        {token && (
          <div>
            <button onClick={() => setView('movies')} style={btnStyle}>Movies</button>
            <button onClick={() => setView('history')} style={btnStyle}>History</button>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={btnStyle}>Logout</button>
          </div>
        )}
      </nav>

      {view === 'login' && (
        <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '100px auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="email" placeholder="Email" required style={inputStyle} />
          <input name="password" type="password" placeholder="Password" required style={inputStyle} />
          <button type="submit" style={actionBtn}>Sign In</button>
        </form>
      )}

      {view === 'movies' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {movies.map(m => (
            <div key={m.id} style={{ background: '#1a1f2e', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <img src={m.poster} alt={m.title} style={{ borderRadius: '5px' }} />
              <h3>{m.title}</h3>
              <button onClick={() => handleBooking(m.title)} style={actionBtn}>Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#151922', color: 'white' };
const btnStyle = { background: 'transparent', color: '#9aa4b2', border: 'none', cursor: 'pointer', margin: '0 10px' };
const actionBtn = { background: '#6573ff', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' };