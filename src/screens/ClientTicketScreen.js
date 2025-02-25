// also implement view ticket

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/ClientScreen.css';

const ClientTicketScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticket } = location.state || {}; // Retrieve the generated ticket from state

  // Retrieve user details from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/login'); // Redirect to login if no user data is found
    return null;
  }

  if (!ticket) {
    return (
      <div className="home-container">
        <header className="home-header">
          <button className="nav-button back-button" onClick={() => navigate('/client_home')}>
            <FaArrowLeft />
          </button>
          <h1>Panel Client - Gestion File</h1>
        </header>
        <main className="client-main">
          <section className="service-selection">
            <h2 className="section-title">Bienvenue, {user.prenom} {user.nom}</h2>
            <hr style={{ marginTop: '5px', marginBottom: '20px', border: '1px solid #0A8791' }} />
            <h2 className="section-title">Aucun ticket trouvé</h2>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <button className="nav-button back-button" onClick={() => navigate('/client_home')}>
          <FaArrowLeft />
        </button>
        <h1>Panel Client - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          <h2 className="section-title">Bienvenue, {user.prenom} {user.nom}</h2>
          <hr style={{ marginTop: '5px', marginBottom: '20px', border: '1px solid #0A8791' }} />
          <h2 className="section-title">Voici votre ticket</h2>
          <div className="ticket-details">
            <h3>Votre Ticket</h3>
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Numéro de Ticket</th>
                  <th>Date de Création</th>
                  <th>Statut</th>
                  <th>Position dans la file</th>
                  <th>Service</th>
                  <th>Localisation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ticket.newTicket.ticketNumber}</td>
                  <td>{new Date(ticket.newTicket.createdAt).toLocaleString()}</td>
                  <td>{ticket.newTicket.status}</td>
                  <td>{ticket.newTicket.positionInQueue}</td>
                  <td>{ticket.service.name}</td>
                  <td>{ticket.location.name}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ticket-details">
            <h3>Ticket Actuellement en Service</h3>
            {ticket.currentTicket ? (
              <table className="ticket-table">
                <thead>
                  <tr>
                    <th>Numéro de Ticket</th>
                    <th>Date de Création</th>
                    <th>Statut</th>
                    <th>Position dans la file</th>
                    <th>Service</th>
                    <th>Localisation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ticket.currentTicket.ticketNumber}</td>
                    <td>{new Date(ticket.currentTicket.createdAt).toLocaleString()}</td>
                    <td>{ticket.currentTicket.status}</td>
                    <td>{ticket.currentTicket.positionInQueue}</td>
                    <td>{ticket.service.name}</td>
                    <td>{ticket.location.name}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Aucun ticket en cours de service.</p>
            )}
          </div>

          <div className="ticket-details">
            <h3>Personnes Devant Vous</h3>
            <p>{ticket.peopleAhead} personne(s) devant vous.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientTicketScreen;