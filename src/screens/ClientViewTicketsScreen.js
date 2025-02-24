import React, { useState } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ClientViewTicketsScreen = () => {
  const navigate = useNavigate();
  const [user] = useState({ firstName: 'John', lastName: 'Doe' });
  
  // Mock data for tickets
  const mockTickets = [
    { ticketNumber: '12345', createdAt: '2024-02-19', status: 'En attente', positionInQueue: 3, service: { name: 'Service 1' }, location: { name: 'Location 1' } },
    { ticketNumber: '67890', createdAt: '2024-02-18', status: 'Servi', positionInQueue: '-', service: { name: 'Service 2' }, location: { name: 'Location 2' } }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <button className="nav-button back-button" onClick={() => navigate('/client_home')}>
          /
        </button>
        <h1>Panel Client - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          <h2 className="section-title">Bienvenue, {user.firstName} {user.lastName}</h2>
          <hr style={{ marginTop: "5px", marginBottom: "20px", border: "1px solid #0A8791" }} />
          <h2 className="section-title">Vos tickets</h2>
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
              {mockTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.createdAt}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.positionInQueue}</td>
                  <td>{ticket.service.name}</td>
                  <td>{ticket.location.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="nav-links" style={{marginTop:"10px", alignItems:"center", justifyContent:'center', display:'flex'}}>
            <button className="nav-button" onClick={() => navigate('/client_obtain_ticket')}>Obtenir un ticket</button>
            <button className="nav-button" onClick={() => navigate('/client_home')}>Accueil client</button>
            <button className="nav-button" onClick={() => navigate('/logout')}>Se déconnecter</button>
          </div> */}
        </section>
      </main>
    </div>
  );
};

export default ClientViewTicketsScreen;
