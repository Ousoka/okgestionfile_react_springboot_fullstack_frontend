import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import { FaArrowLeft } from 'react-icons/fa';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackPress = () => {
      navigate(-1);
      return true;
    };

    window.addEventListener('popstate', handleBackPress);
    return () => window.removeEventListener('popstate', handleBackPress);
  }, [navigate]);

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <button
          className="nav-button back-button"
          onClick={() => navigate('/')}
        >
          /
        </button>
        <h1>Bienvenue sur OKGestionFile</h1>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <section className="navigation-section">
          {/* <h2 className="section-title">Accéder aux Sections</h2> */}
          <div className="navigation-buttons">
            <button
              className="nav-button client-button"
              onClick={() => navigate('/login')}
            >
              Connectez vous ici
            </button>
          </div>
        </section>
      </main>

    </div>
  );
};

export default WelcomeScreen;
