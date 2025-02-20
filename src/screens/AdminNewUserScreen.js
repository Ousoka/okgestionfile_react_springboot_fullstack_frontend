import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminScreen.css';

const AdminNewUserScreen = () => {
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


        <h2>Créer un nouvel utilisateur</h2>
        <form onSubmit={handleCreateUser} className="user-form">
          <input type="text" name="prenom" placeholder="Prénom" required onChange={handleChange} />
          <input type="text" name="nom" placeholder="Nom" required onChange={handleChange} />
          <input type="text" name="numeroTel" placeholder="Numéro Téléphone" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Mot de passe" required onChange={handleChange} />
          <select name="role" required onChange={handleChange}>
            <option value="ADMIN">Admin</option>
            <option value="AGENT">Agent</option>
            <option value="CLIENT">Client</option>
          </select>
          {newUser.role === 'AGENT' && (
            <>
              <input type="text" name="serviceId" placeholder="Service" onChange={handleChange} />
              <input type="text" name="locationId" placeholder="Location" onChange={handleChange} />
            </>
          )}
          <button type="submit" className="nav-button client-button">Créer</button>
        </form>

        </section>
      </main>
    </div>
  );
};

export default AdminNewUserScreen;
