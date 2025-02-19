import React, { useState } from 'react';
import '../styles/AgentScreen.css';

const AgentScreen = () => {
  // Mock Data
  const mockServices = [
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
  ];

  const mockLocations = [
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
  ];

  const mockTickets = [
    { id: 1, ticketNumber: 'A101', positionInQueue: 1, status: 'EN_ATTENTE' },
    { id: 2, ticketNumber: 'A102', positionInQueue: 2, status: 'EN_ATTENTE' },
    { id: 3, ticketNumber: 'A103', positionInQueue: 3, status: 'TERMINE' },
  ];

  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentTicket, setCurrentTicket] = useState(mockTickets[0]);
  const [tickets, setTickets] = useState(mockTickets);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedService && selectedLocation) {
      alert(
        `Selected Service: ${mockServices.find((s) => s.id === parseInt(selectedService)).name}, 
         Selected Location: ${mockLocations.find((l) => l.id === parseInt(selectedLocation)).name}`
      );
    } else {
      alert('Veuillez sélectionner un service et une localisation.');
    }
  };

  const handleAction = (action) => {
    if (action === 'precedent') {
      alert('Action: Précédent');
    } else if (action === 'suivant') {
      alert('Action: Suivant');
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Panel Agent</h1>
      </header>
      <main className="agent-main">
        {/* Service and Location Selection */}
        <form onSubmit={handleFormSubmit} className="agent-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceId">Selectionner un Service:</label>
              <select
                id="serviceId"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selectionner un service
                </option>
                {mockServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="locationId">Selectionner une Localisation:</label>
              <select
                id="locationId"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selectionner une localisation
                </option>
                {mockLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Voir les Tickets
          </button>
        </form>

        {/* Current Ticket */}
        {currentTicket && (
          <div className="current-ticket">
            <h2>Le ticket en cours de traitement</h2>
            <div className="alert alert-info">
              <p>
                <strong>Numero du ticket :</strong> {currentTicket.ticketNumber}
              </p>
              <p>
                <strong>Position dans la file : </strong> {currentTicket.positionInQueue}
              </p>
              <p>
                <strong>Le numéro qui est en train d’être traité : </strong> {currentTicket.status}
              </p>
              <p>
                <strong>Le nombre de personnes devant : </strong> {currentTicket.ticketNumber}
              </p>
            </div>
          </div>
        )}

        {/* Tickets Queue */}
        {tickets.length > 0 && (
          <div className="ticket-queue">
            <h2>File d'attente du service</h2>
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Numero du ticket</th>
                  <th>Position</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.ticketNumber}</td>
                    <td>{ticket.positionInQueue}</td>
                    <td>{ticket.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Actions */}
            <div className="actions">
              <button
                className="btn"
                onClick={() => handleAction('precedent')}
                disabled={tickets.every((t) => t.status !== 'EN_ATTENTE')}
              >
                Précédent
              </button>
              <button
                className="btn"
                onClick={() => handleAction('suivant')}
                disabled={tickets.every((t) => t.status !== 'TERMINE')}
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AgentScreen;
