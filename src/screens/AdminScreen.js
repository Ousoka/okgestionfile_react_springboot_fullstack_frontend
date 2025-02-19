import React, { useState, useEffect } from 'react';
import '../styles/AdminScreen.css';
import { useNavigate } from 'react-router-dom';

const AdminScreen = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const handleBackPress = () => {
      navigate(-1);
      return true;
    };

    window.addEventListener('popstate', handleBackPress);
    return () => window.removeEventListener('popstate', handleBackPress);
  }, [navigate]);

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  // Mock data for queue information
  const [queueInfos, setQueueInfos] = useState([]);

  // Simulating data fetch
  useEffect(() => {
    const mockData = [
      {
        locationName: 'Location 1',
        serviceName: 'Service A',
        currentTicket: { ticketNumber: 'A101', status: 'EN_ATTENTE' },
        allTickets: [
          { ticketNumber: 'A101', status: 'EN_ATTENTE' },
          { ticketNumber: 'A102', status: 'TERMINE' },
        ],
      },
      {
        locationName: 'Location 2',
        serviceName: 'Service B',
        currentTicket: null,
        allTickets: [
          { ticketNumber: 'B201', status: 'EN_ATTENTE' },
          { ticketNumber: 'B202', status: 'TERMINE' },
        ],
      },
    ];
    setQueueInfos(mockData);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <button
          className="nav-button back-button"
          onClick={() => navigate('/')}
        >
          /
        </button>
        <h1>
          Panel Admin
        </h1>
      </header>

      <main className="admin-main">
        {queueInfos.length > 0 ? (
          <>
            <h2>Files d'attente</h2>
            <table className="admin-queue-table">
              <thead>
                <tr>
                  <th>Localisation</th>
                  <th>Service</th>
                  <th>Ticket en cours</th>
                  <th>Tous les Tickets</th>
                </tr>
              </thead>
              <tbody>
                {queueInfos.map((queueInfo, index) => (
                  <tr key={index}>
                    <td>{queueInfo.locationName}</td>
                    <td>{queueInfo.serviceName}</td>
                    <td>
                      {queueInfo.currentTicket ? (
                        `${queueInfo.currentTicket.ticketNumber} - ${queueInfo.currentTicket.status}`
                      ) : (
                        'Pas de ticket en cours'
                      )}
                    </td>
                    <td>
                      <ul>
                        {queueInfo.allTickets.map((ticket, idx) => (
                          <li key={idx}>
                            {ticket.ticketNumber} - {ticket.status}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Chargement des données...</p>
        )}
      </main>

          <div className="navigation-buttons1">
            <button
              className="nav-button client-button"
              onClick={() => navigate('/login')}
            >
              Gestion des utilisateurs
            </button>
            <button
              className="nav-button admin-button"
              onClick={() => navigate('/admin')}
            >
              Se deconnecter
            </button>
          </div>

    </div>
  );
};

export default AdminScreen;
