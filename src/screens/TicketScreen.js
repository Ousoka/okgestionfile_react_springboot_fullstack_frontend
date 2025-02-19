import React from 'react';
import '../styles/TicketScreen.css'; // Assuming you are importing your base styles here

const TicketScreen = () => {
  // Mock data
  const currentTicket = {
    ticketNumber: 'A101',
    positionInQueue: 5,
  };

  const newTicket = {
    ticketNumber: 'B202',
    positionInQueue: 3,
    service: { name: 'Service B' },
    location: { name: 'Location 2' },
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Votre Ticket</h1>
      </header>

      <main className="ticket-main">
        <p style={{ fontSize:'22px' }}>
          <strong>Client en cours (Ticket - Position) : </strong>
          {currentTicket ? (
            <p style={{ color: '#0a8791', fontWeight:'bold' }}>
            Ticket - {currentTicket.ticketNumber}, Position - {currentTicket.positionInQueue}
          </p>

          ) : (
            <span>Aucun ticket en cours</span>
          )}
        </p>

        <h2>Les détails de votre ticket</h2>
        <div className="ticket-details">
          <p><strong>Numéro du ticket :</strong> {newTicket.ticketNumber}</p>
          <p><strong>Position du ticket :</strong> {newTicket.positionInQueue}</p>
          <p><strong>Service :</strong> {newTicket.service.name}</p>
          <p><strong>Localisation :</strong> {newTicket.location.name}</p>
        </div>
      </main>
    </div>
  );
};

export default TicketScreen;
