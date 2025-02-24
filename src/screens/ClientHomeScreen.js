import React, { useState, useEffect } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const ClientHomeScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);

  // Mock data for services and locations (replace with API calls if needed)
  const mockServices = [
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    { id: 3, name: 'Service 3' },
  ];

  const mockLocations = [
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
    { id: 3, name: 'Location 3' },
  ];

  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Redirect to login if no user data is found
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedService && selectedLocation) {
      navigate('/ticket');
    } else {
      alert('Veuillez sélectionner un service et une localisation.');
    }
  };

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.get('https://okgestionfile-springboot-fullstack.onrender.com/api/logout', {
        withCredentials: true, // Include session cookie
      });

      // Clear local storage and redirect to login
      localStorage.removeItem('user');
      SecurityContextHolder.clearContext();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the request fails, clear local data and redirect
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <button
          className="nav-button back-button"
          onClick={() => navigate('/client_home')}
        >
          <FaArrowLeft />
        </button>
        <h1>Panel Client - Gestion File</h1>
      </header>
      <main className="home-main">
        <section className="navigation-section">
          <h2 className="section-title">
            Bienvenue, {user?.prenom} {user?.nom}
          </h2>

          <div className="navigation-buttons1">
            <button
              className="nav-button client-button"
              onClick={() => navigate('/client_view_tickets')}
            >
              Voir mes tickets
            </button>
            <button
              className="nav-button agent-button"
              onClick={() => navigate('/client_obtain_ticket')}
            >
              Obtenir un ticket
            </button>
            <button
              className="nav-button admin-button"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientHomeScreen;