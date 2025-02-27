 
import React, { useState, useEffect } from 'react';
import '../styles/AgentScreen.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgentScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch agent's tickets based on their assigned service and location
  useEffect(() => {
    const fetchAgentData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://okgestionfile-springboot-fullstack.onrender.com/api/agent_home',
          { withCredentials: true }
        );

        if (response.data) {
          setTickets(response.data.tickets || []);
          setCurrentTicket(response.data.currentTicket || null);
        } else {
          setError('Aucune donnée trouvée.');
        }
      } catch (err) {
        console.error('Error fetching agent data:', err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError('Échec de la récupération des données. Veuillez réessayer plus tard.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAgentData();
    }
  }, [user, navigate]);

  const handleAction = async (action) => {
    // Determine ticket to process
    let ticketIdToUse = currentTicket ? currentTicket.id : null;
    if (!ticketIdToUse) {
      if (action === 'suivant' && tickets.some((t) => t.status === 'EN_ATTENTE')) {
        ticketIdToUse = tickets.find((t) => t.status === 'EN_ATTENTE').id; // First EN_ATTENTE
      } else if (action === 'precedent' && tickets.some((t) => t.status === 'TERMINE')) {
        // Pick the most recent TERMINE ticket (highest positionInQueue or last in list)
        ticketIdToUse = tickets
          .filter((t) => t.status === 'TERMINE')
          .sort((a, b) => b.positionInQueue - a.positionInQueue)[0]?.id;
      }
    }

    if (!ticketIdToUse) {
      alert(action === 'suivant' ? 'Aucun ticket en attente à traiter.' : 'Aucun ticket terminé à réactiver.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        'https://okgestionfile-springboot-fullstack.onrender.com/api/agent/ticket/status',
        {
          params: {
            ticketId: ticketIdToUse,
            action: action
          },
          withCredentials: true
        }
      );

      if (response.data) {
        setTickets(response.data.tickets || []);
        setCurrentTicket(response.data.currentTicket || null);
      } else {
        setError('Échec de la mise à jour du statut du ticket.');
      }
    } catch (err) {
      console.error('Error updating ticket status:', err);
      setError('Échec de la mise à jour du statut du ticket: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className="loading-message">Récupération des données...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <button className="nav-button back-button" onClick={() => navigate('/agent_home')}>
          /
        </button>
        <h1>Panel Agent - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          <h2 className="section-title">Bienvenue, {user.prenom} {user.nom}</h2>
          <hr style={{ marginTop: "5px", marginBottom: "20px", border: "1px solid #0A8791" }} />

          {/* Current Ticket */}
          {currentTicket && (
            <div className="current-ticket">
              <h2>Le ticket en cours de traitement</h2>
              <div className="alert alert-info">
                <p>
                  <strong>Numéro du ticket :</strong> {currentTicket.ticketNumber}
                </p>
                <p>
                  <strong>Position dans la file :</strong> {currentTicket.positionInQueue}
                </p>
                <p>
                  <strong>Le numéro qui est en train d’être traité :</strong> {currentTicket.status}
                </p>
                <p>
                  <strong>Le nombre de personnes devant :</strong> {currentTicket.ticketNumber}
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
                    <th>Numéro du ticket</th>
                    <th>Position</th>
                    <th>Statut</th>
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
                  disabled={tickets.every((t) => t.status === 'EN_ATTENTE')} // Disabled if all are EN_ATTENTE
                >
                  Précédent
                </button>
                <button
                  className="btn"
                  onClick={() => handleAction('suivant')}
                  disabled={tickets.every((t) => t.status === 'TERMINE')} // Disabled if all are TERMINE
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AgentScreen;