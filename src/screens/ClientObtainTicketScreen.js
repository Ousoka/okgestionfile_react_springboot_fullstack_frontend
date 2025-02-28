import React, { useState, useEffect } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from '../api/axios'

const ClientObtainTicketScreen = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]); // State to store services
  const [locations, setLocations] = useState([]); // State to store locations
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [user, setUser] = useState(null); // State to store user data

  // Retrieve user details from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user data in state
    } else {
      // Redirect to login if no user data is found
      navigate('/login');
    }
  }, [navigate]);

  // Fetch services and locations from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://okgestionfile-springboot-fullstack.onrender.com/api/client_obtain_ticket',
          {
            withCredentials: true, // Include session cookies
          }
        );

        if (response.data) {
          setServices(response.data.services); // Set services in state
          setLocations(response.data.locations); // Set locations in state
        } else {
          setError('No data found.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response && err.response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
 
    if (!selectedService || !selectedLocation) {
      alert('Veuillez sélectionner un service et une localisation.');
      return;
    }

    try {
      // Send selected service and location to the backend to generate a ticket
      const response = await axios.post(
        'https://okgestionfile-springboot-fullstack.onrender.com/api/client_ticket',
        null, // No request body for GET requests
        {
          params: {
            serviceId: selectedService,
            locationId: selectedLocation,
          },
          withCredentials: true, // Include session cookies
        }
      );

      if (response.data) {
        // Redirect to the ticket page with the generated ticket details
        navigate('/ticket', { state: { ticket: response.data } });
      } else {
        setError('Failed to generate ticket.');
      }
    } catch (err) {
      console.error('Error generating ticket:', err);
      if (err.response && err.response.status === 401) {
        navigate('/login'); // Redirect to login if unauthorized
      } else {
        setError('Failed to generate ticket. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Show error message
  }

  if (!user) {
    return null; // Do not render anything if user data is not available
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <button
          className="nav-button back-button"
          onClick={() => navigate('/client_home')}
        >
          <FaArrowLeft />
        </button>
        <h1>Panel Client - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          <h2 className="section-title">Bienvenue, {user.firstName} {user.lastName}</h2>
          <hr style={{ marginTop: '5px', marginBottom: '20px', border: '1px solid #0A8791' }} />
          <h2 className="section-title">Obtention d'un ticket</h2>

          <form onSubmit={handleFormSubmit} className="client-form">
            <div className="form-group">
              <label htmlFor="service">Sélectionner un Service :</label>
              <select
                id="service"
                name="serviceId"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              >
                <option value="">Choisir un service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Sélectionner la Localisation :</label>
              <select
                id="location"
                name="locationId"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
              >
                <option value="">Choisir une localisation</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <button type="submit" className="nav-button" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                Obtenir un ticket
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ClientObtainTicketScreen;