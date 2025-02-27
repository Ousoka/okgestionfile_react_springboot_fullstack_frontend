import React, { useState, useEffect } from 'react';
import '../styles/AdminScreen.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [queueInfos, setQueueInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from localStorage on mount only once
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]); // Only depends on navigate

  // Handle browser back button
  useEffect(() => {
    const handleBackPress = () => {
      navigate(-1);
      return true;
    };
    window.addEventListener('popstate', handleBackPress);
    return () => window.removeEventListener('popstate', handleBackPress);
  }, [navigate]);

  // Fetch admin dashboard data once user is set
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://okgestionfile-springboot-fullstack.onrender.com/api/admin_home',
          { withCredentials: true }
        );

        if (response.data) {
          setQueueInfos(response.data.queueInfos || []);
          // Only update user if explicitly needed, avoiding loop
          // if (response.data.user) {
          //   setUser(response.data.user);
          //   localStorage.setItem('user', JSON.stringify(response.data.user));
          // }
        } else {
          setError('Aucune donnée trouvée.');
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError('Échec de la récupération des données: ' + (err.response?.data || err.message));
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAdminData();
    }
  }, [user, navigate]); // Dependencies are stable

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/', { replace: true });
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
        <button className="nav-button back-button" onClick={() => navigate('/admin_home')}>
          /
        </button>
        <h1>Panel Admin - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          <h2 className="section-title">Bienvenue, {user.prenom} {user.nom}</h2>
          <hr style={{ marginTop: "5px", marginBottom: "20px", border: "1px solid #0A8791" }} />

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
            <p>Aucune file d'attente disponible.</p>
          )}

          <div className="navigation-buttons1">
            <button
              className="nav-button client-button"
              onClick={() => navigate('/admin/users')}
            >
              Gestion des utilisateurs
            </button>
            <button
              className="nav-button admin-button"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminScreen;