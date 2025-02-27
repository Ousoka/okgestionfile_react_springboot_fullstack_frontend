import React, { useState, useEffect } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const AgentHomeScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
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
  
  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.get('https://okgestionfile-springboot-fullstack.onrender.com/api/logout', {
        withCredentials: true, // Include session cookie
      });

      // Clear local storage and redirect to login
      localStorage.removeItem('user');
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
          onClick={() => navigate('/agent_home')}
        >/
        </button>
        <h1>
          {/* <button onClick={() => navigate(-1)} className="resto_home_back-button">
              <FaArrowLeft size={40} color="#FFF" />
            </button> */}
          Panel Client - Gestion File
        </h1>
      </header>
      <main className="home-main">
        <section className="navigation-section">

        <h2 className="section-title">Bienvenue, {user?.prenom} {user?.nom}</h2>

        
        <div className="navigation-buttons1">
            <button 
              className="nav-button client-button"
              onClick={() => navigate('/agent')}
            >
              Gestion du service
            </button>
            <button
              className="nav-button admin-button"
              onClick={handleLogout}
            >
              Se deconnecter
            </button>
          </div>
     
        </section>
        </main>
    </div>
  );
};

export default AgentHomeScreen;
