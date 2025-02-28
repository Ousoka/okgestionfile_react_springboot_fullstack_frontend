import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminScreen.css';
import axios from 'axios';

const AdminUsersScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState({ agents: [], clients: [], admins: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load admin user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://okgestionfile-springboot-fullstack.onrender.com/api/users',
          { withCredentials: true }
        );

        if (response.data) {
          setUsers({
            agents: response.data.agents || [],
            clients: response.data.clients || [],
            admins: response.data.admins || [],
          });
        } else {
          setError('Aucune donnée d’utilisateurs trouvée.');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
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
      fetchUsers();
    }
  }, [user, navigate]);

  const handleDeleteUser = async (id, role) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://okgestionfile-springboot-fullstack.onrender.com/api/deleteUser/${id}`,
        { withCredentials: true }
      );

      if (response.data) {
        setUsers({
          agents: response.data.agents || [],
          clients: response.data.clients || [],
          admins: response.data.admins || [],
        });
        alert(`Utilisateur avec ID ${id} supprimé (rôle: ${role})`);
      } else {
        setError('Échec de la suppression de l’utilisateur.');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Échec de la suppression de l’utilisateur: ' + (err.response?.data || err.message));
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
        <button className="nav-button back-button" onClick={() => navigate('/admin_home')}>
          /
        </button>
        <h1>Panel Admin - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          <h2 className="section-title">Bienvenue, {user.prenom} {user.nom}</h2>
          <hr style={{ marginTop: "5px", marginBottom: "20px", border: "1px solid #0A8791" }} />

          <h2>Liste des utilisateurs</h2>

          <h3>Agents</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Service</th>
                <th>Localisation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}</td>
                  <td>{agent.prenom}</td>
                  <td>{agent.nom}</td>
                  <td>{agent.numeroTel}</td>
                  <td>{agent.service?.name || 'N/A'}</td>
                  <td>{agent.location?.name || 'N/A'}</td>
                  <td>
                    <button
                      className="nav-button admin-button"
                      onClick={() => handleDeleteUser(agent.id, 'AGENT')}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Clients</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.prenom}</td>
                  <td>{client.nom}</td>
                  <td>{client.numeroTel}</td>
                  <td>
                    <button
                      className="nav-button admin-button"
                      onClick={() => handleDeleteUser(client.id, 'CLIENT')}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Admins</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Téléphone</th>
              </tr>
            </thead>
            <tbody>
              {users.admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.prenom}</td>
                  <td>{admin.nom}</td>
                  <td>{admin.numeroTel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminUsersScreen;