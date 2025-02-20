import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import { FaArrowLeft } from 'react-icons/fa';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleBackPress = () => {
      navigate(-1);
      return true;
    };

    window.addEventListener('popstate', handleBackPress);
    return () => window.removeEventListener('popstate', handleBackPress);
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log('Email:', email, 'Password:', password);
    // Add authentication logic here
    navigate('/admin_home')
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <button
          className="nav-button back-button"
          onClick={() => navigate('/')}
        >/
        </button>
        <h1>Bienvenue sur OKGestionFile</h1>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <section className="navigation-section">
          {/* <h2 className="section-title">Connectez-vous ici</h2> */}
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Numero de telephone"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="nav-button">Se connecter</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default LoginScreen;