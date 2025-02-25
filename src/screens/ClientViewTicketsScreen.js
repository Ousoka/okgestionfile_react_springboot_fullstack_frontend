// import React, { useState } from 'react';
// import '../styles/ClientScreen.css';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';

// const ClientViewTicketsScreen = () => {
//   const navigate = useNavigate();
//   const [user] = useState({ firstName: 'John', lastName: 'Doe' });
  
//   // Mock data for tickets
//   const mockTickets = [
//     { ticketNumber: '12345', createdAt: '2024-02-19', status: 'En attente', positionInQueue: 3, service: { name: 'Service 1' }, location: { name: 'Location 1' } },
//     { ticketNumber: '67890', createdAt: '2024-02-18', status: 'Servi', positionInQueue: '-', service: { name: 'Service 2' }, location: { name: 'Location 2' } }
//   ];

//   return (
//     <div className="home-container">
//       <header className="home-header">
//         <button className="nav-button back-button" onClick={() => navigate('/client_home')}>
//           /
//         </button>
//         <h1>Panel Client - Gestion File</h1>
//       </header>
//       <main className="client-main">
//         <section className="service-selection">
//           <h2 className="section-title">Bienvenue, {user.firstName} {user.lastName}</h2>
//           <hr style={{ marginTop: "5px", marginBottom: "20px", border: "1px solid #0A8791" }} />
//           <h2 className="section-title">Vos tickets</h2>
//           <table className="ticket-table">
//             <thead>
//               <tr>
//                 <th>Numéro de Ticket</th>
//                 <th>Date de Création</th>
//                 <th>Statut</th>
//                 <th>Position dans la file</th>
//                 <th>Service</th>
//                 <th>Localisation</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mockTickets.map((ticket, index) => (
//                 <tr key={index}>
//                   <td>{ticket.ticketNumber}</td>
//                   <td>{ticket.createdAt}</td>
//                   <td>{ticket.status}</td>
//                   <td>{ticket.positionInQueue}</td>
//                   <td>{ticket.service.name}</td>
//                   <td>{ticket.location.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* <div className="nav-links" style={{marginTop:"10px", alignItems:"center", justifyContent:'center', display:'flex'}}>
//             <button className="nav-button" onClick={() => navigate('/client_obtain_ticket')}>Obtenir un ticket</button>
//             <button className="nav-button" onClick={() => navigate('/client_home')}>Accueil client</button>
//             <button className="nav-button" onClick={() => navigate('/logout')}>Se déconnecter</button>
//           </div> */}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default ClientViewTicketsScreen;


import React, { useState, useEffect } from 'react';
import '../styles/ClientScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const ClientViewTicketsScreen = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [firstName, setFirstName] = useState(''); // State to store user's first name
  const [lastName, setLastName] = useState(''); // State to store user's last name
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Redirect to login if no user data is found
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          'https://okgestionfile-springboot-fullstack.onrender.com/api/client_view_tickets',
          {
            withCredentials: true, // Include session cookies
          }
        );

        if (response.data && response.data.tickets) {
          setTickets(response.data.tickets); // Set tickets in state
        } else {
          setTickets([]); // Set tickets to an empty array if no tickets are found
        }
      } catch (err) {
        console.error('Error fetching tickets:', err);
        // setError('Failed to fetch tickets. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTickets();
  }, []);

  if (!user) {
    return null; // Do not render anything if user data is not available
  }

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading state
  // }

  // if (error) {
  //   return <div className="error-message">{error}</div>; // Show error message
  // }

  return (
    <div className="home-container">
      <header className="home-header">
        <button className="nav-button back-button" onClick={() => navigate('/client_home')}>
          <FaArrowLeft />
        </button>
        <h1>Panel Client - Gestion File</h1>
      </header>
      <main className="client-main">
        <section className="service-selection">
          <h2 className="section-title">Bienvenue, {user?.prenom} {user?.nom}</h2>
          <hr style={{ marginTop: '5px', marginBottom: '20px', border: '1px solid #0A8791' }} />
          <h2 className="section-title">Vos tickets</h2>
          {loading ? (
            <div>Loading...</div>
          ) : tickets.length === 0 ? (
            <div className="no-tickets-message">Aucun ticket trouvé.</div>
          ) : (
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Numéro de Ticket</th>
                  <th>Date de Création</th>
                  <th>Statut</th>
                  <th>Position dans la file</th>
                  <th>Service</th>
                  <th>Localisation</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={index}>
                    <td>{ticket.ticketNumber}</td>
                    <td>{ticket.createdAt}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.positionInQueue}</td>
                    <td>{ticket.service?.name}</td>
                    <td>{ticket.location?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default ClientViewTicketsScreen;