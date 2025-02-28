import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import { FaArrowLeft } from 'react-icons/fa';
import axios from '../api/axios'

const LoginScreen = () => {
  const navigate = useNavigate();
  const [numeroTel, setNumeroTel] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://okgestionfile-springboot-fullstack.onrender.com/api/login', {
        numeroTel,
        password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Match backend expectation
        },
        withCredentials: true, // Include cookies for session
      });

      // Handle successful login
      const { role } = response.data; // Extract role from response

      // Store user data in sessionStorage or context (optional)
      sessionStorage.setItem('user', JSON.stringify(response.data));

      // Redirect based on role
      switch (role) {
        case 'CLIENT':
          navigate('/client_home');
          break;
        case 'AGENT':
          navigate('/agent_home');
          break;
        case 'ADMIN':
          navigate('/admin_home');
          break;
        default:
          navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message || 'Numéro de téléphone ou mot de passe invalide.');
      } else {
        setError('Une erreur s\'est produite. Veuillez réessayer.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <button className="nav-button back-button" onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
        <h1>Bienvenue sur OKGestionFile</h1>
      </header>
      <main className="home-main">
        <section className="navigation-section">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Numéro de téléphone"
              className="login-input"
              value={numeroTel}
              onChange={(e) => setNumeroTel(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="nav-button">
              Se connecter
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default LoginScreen;