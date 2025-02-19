import React, { useState } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ClientObtainTicketScreen = () => {
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
          onClick={() => navigate('/client')}
        >/
        </button>
        <h1>
          Panel Client - Gestion File
        </h1>
      </header>
      <main className="client-main">
        <section className="service-selection">

        <h2 className="section-title">Bienvenue, {user.firstName} {user.lastName}</h2>
          <hr style={{ marginTop: "5px", marginBottom: "20px", border: "1px solid #0A8791" }} />
          <h2 className="section-title">Obtention d'un ticket</h2>


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
              <button type="submit" className="nav-button" style={{alignItems:"center", justifyContent:'center', display:'flex'}}>
                Obtenir un ticket
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ClientObtainTicketScreen;
