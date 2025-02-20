import React, { useState } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AdminHomeScreen = () => {
  const navigate = useNavigate();
  // Mock data for services and locations
  const mockServices = [
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    { id: 3, name: 'Service 3' },
  ];
  const [user, setUser] = useState({ firstName: 'John', lastName: 'Doe' }); // Example user data

  const mockLocations = [
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
    { id: 3, name: 'Location 3' },
  ];

  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedService && selectedLocation) {
      navigate('/ticket')
      // alert(`Ticket généré pour: 
      //   Service: ${mockServices.find((s) => s.id === parseInt(selectedService)).name}, 
      //   Location: ${mockLocations.find((l) => l.id === parseInt(selectedLocation)).name}`);
    } else {
      alert('Veuillez sélectionner un service et une localisation.');
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <button
          className="nav-button back-button"
          onClick={() => navigate('/admin_home')}
        >/
        </button>
        <h1>
          {/* <button onClick={() => navigate(-1)} className="resto_home_back-button">
              <FaArrowLeft size={40} color="#FFF" />
            </button> */}
          Panel Admin - Gestion File
        </h1>
      </header>
      <main className="home-main">
        <section className="navigation-section">

        <h2 className="section-title">Bienvenue, {user.firstName} {user.lastName}</h2>

        
        <div className="navigation-buttons1">
            <button
              className="nav-button client-button"
              onClick={() => navigate('/admin_dashboard')}
            >
              Dashboard 
            </button>
            <button
              className="nav-button agent-button1"
              onClick={() => navigate('/admin_new_user')}
            >
              Creation d'un utilisateur
            </button>
            <button
              className="nav-button agent-button"
              onClick={() => navigate('/admin_users')}
            >
              Gestion des utilisateurs
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

export default AdminHomeScreen;
