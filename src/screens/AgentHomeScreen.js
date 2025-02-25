import React, { useState } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const AgentHomeScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  // Mock data for services and locations
  const mockServices = [ 
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    { id: 3, name: 'Service 3' },
  ];
  // const [user, setUser] = useState({ firstName: 'John', lastName: 'Doe' }); // Example user data

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
              onClick={() => navigate('/login')}
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
