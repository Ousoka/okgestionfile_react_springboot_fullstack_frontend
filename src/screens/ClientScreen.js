import React, { useState } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ClientScreen = () => {
  const navigate = useNavigate();
  // Mock data for services and locations
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
          onClick={() => navigate('/client_home')}
        >/
        </button>
        <h1>
          {/* <button onClick={() => navigate(-1)} className="resto_home_back-button">
              <FaArrowLeft size={40} color="#FFF" />
            </button> */}
          Panel Client - Gestion File
        </h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          {/* <h2 className="section-title">Sélectionnez un service</h2> */}
          <form onSubmit={handleFormSubmit} className="client-form">
            <div className="form-group">
              <label htmlFor="service">Selectionner un Service :</label>
              <select
                id="service"
                name="serviceId"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              >
                <option value="">Choisir un service</option>
                {mockServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Selectionner la Localisation :</label>
              <select
                id="location"
                name="locationId"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
              >
                <option value="">Choisir une localisation</option>
                {mockLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <button type="submit" className="btn">
                Obtenir un ticket
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ClientScreen;
