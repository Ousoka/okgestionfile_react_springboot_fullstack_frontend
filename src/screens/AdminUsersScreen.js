import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminScreen.css';

const AdminUsersScreen = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ firstName: 'Admin', lastName: 'User' });

  const [users, setUsers] = useState({
    agents: [
      { id: 1, prenom: 'Alice', nom: 'Doe', numeroTel: '123456789', service: 'Service A', location: 'Location 1' },
      { id: 2, prenom: 'Bob', nom: 'Smith', numeroTel: '987654321', service: 'Service B', location: 'Location 2' },
    ],
    clients: [
      { id: 3, prenom: 'Charlie', nom: 'Brown', numeroTel: '456789123' },
      { id: 4, prenom: 'Diana', nom: 'Prince', numeroTel: '789123456' },
    ],
    admins: [
      { id: 5, prenom: 'Edward', nom: 'Nigma', numeroTel: '159753468' },
    ],
  });

  const [newUser, setNewUser] = useState({
    prenom: '',
    nom: '',
    numeroTel: '',
    password: '',
    role: 'CLIENT',
    serviceId: '',
    locationId: '',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    alert(`Nouvel utilisateur créé: ${JSON.stringify(newUser, null, 2)}`);
  };

  const handleDeleteUser = (id, role) => {
    alert(`Utilisateur avec ID ${id} supprimé (role: ${role})`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <button className="nav-button back-button" onClick={() => navigate('/admin_home')}>
          /
        </button>
        <h1>Panel Agent - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
      <h2 className="section-title">Bienvenue, {user.firstName} {user.lastName}</h2>
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
                <td>{agent.service}</td>
                <td>{agent.location}</td>
                <td><button className="nav-button admin-button" onClick={() => handleDeleteUser(agent.id, 'AGENT')}>Supprimer</button></td>
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
                <td><button className="nav-button admin-button" onClick={() => handleDeleteUser(client.id, 'CLIENT')}>Supprimer</button></td>
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
