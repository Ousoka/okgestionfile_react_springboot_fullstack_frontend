import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminScreen.css';
import axios from '../api/axios'

const AdminNewUserScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newUser, setNewUser] = useState({
    prenom: '',
    nom: '',
    numeroTel: '',
    password: '',
    role: 'CLIENT',
    serviceId: '',
    locationId: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load admin user data from sessionStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch services and locations for agent dropdowns
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://okgestionfile-springboot-fullstack.onrender.com/api/admin', // Reuse /admin for services and locations
          { withCredentials: true }
        );

        if (response.data) {
          setServices(response.data.services || []);
          setLocations(response.data.locations || []);
        } else {
          setError('Aucune donnée trouvée.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
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
      fetchData();
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'https://okgestionfile-springboot-fullstack.onrender.com/api/createUser',
        null,
        {
          params: {
            prenom: newUser.prenom,
            nom: newUser.nom,
            numeroTel: newUser.numeroTel,
            password: newUser.password,
            role: newUser.role,
            serviceId: newUser.role === 'AGENT' ? newUser.serviceId : null,
            locationId: newUser.role === 'AGENT' ? newUser.locationId : null,
          },
          withCredentials: true
        }
      );

      if (response.data) {
        alert('Utilisateur créé avec succès!');
        setNewUser({
          prenom: '',
          nom: '',
          numeroTel: '',
          password: '',
          role: 'CLIENT',
          serviceId: '',
          locationId: '',
        }); // Reset form
      } else {
        setError('Échec de la création de l’utilisateur.');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Échec de la création de l’utilisateur: ' + (err.response?.data || err.message));
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

          <h2>Créer un nouvel utilisateur</h2>
          <form onSubmit={handleCreateUser} className="user-form">
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={newUser.prenom}
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={newUser.nom}
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="numeroTel"
              placeholder="Numéro Téléphone"
              value={newUser.numeroTel}
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={newUser.password}
              required
              onChange={handleChange}
            />
            <select name="role" value={newUser.role} required onChange={handleChange}>
              <option value="ADMIN">Admin</option>
              <option value="AGENT">Agent</option>
              <option value="CLIENT">Client</option>
            </select>
            {newUser.role === 'AGENT' && (
              <>
                <select
                  name="serviceId"
                  value={newUser.serviceId}
                  onChange={handleChange}
                  required={newUser.role === 'AGENT'}
                >
                  <option value="">Choisir un service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
                <select
                  name="locationId"
                  value={newUser.locationId}
                  onChange={handleChange}
                  required={newUser.role === 'AGENT'}
                >
                  <option value="">Choisir une localisation</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            <button type="submit" className="nav-button client-button">
              Créer
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AdminNewUserScreen;