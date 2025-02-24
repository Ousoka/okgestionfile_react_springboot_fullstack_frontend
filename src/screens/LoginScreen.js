import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios'; // Import axios for making HTTP requests

const LoginScreen = () => {
  const navigate = useNavigate();
  const [numeroTel, setNumeroTel] = useState(''); // Changed from email to numeroTel
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle login errors

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('https://okgestionfile-springboot-fullstack.onrender.com/api/login', {
        numeroTel,
        password,
      });

      // Handle the response
      if (response.status === 200) {
        const redirectUrl = response.data; // Get the redirect URL from the response

        // Redirect based on the user's role
        if (redirectUrl === 'redirect:/client_home') {
          navigate('/client_home');
        } else if (redirectUrl === 'redirect:/agent_home') {
          navigate('/agent_home');
        } else if (redirectUrl === 'redirect:/admin') {
          navigate('/admin');
        } else {
          navigate('/home'); // Default redirect
        }
      }
    } catch (error) {
      // Handle login errors
      if (error.response && error.response.status === 401) {
        setError('Numéro de téléphone ou mot de passe invalide.');
      } else {
        setError('Une erreur s\'est produite. Veuillez réessayer.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <button
          className="nav-button back-button"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft />
        </button>
        <h1>Bienvenue sur OKGestionFile</h1>
      </header>

      {/* Main Content */}
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
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
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