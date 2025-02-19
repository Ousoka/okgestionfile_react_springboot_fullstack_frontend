import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import ClientScreen from './screens/ClientScreen';
import AgentScreen from './screens/AgentScreen';
import AdminScreen from './screens/AdminScreen';
import TicketScreen from './screens/TicketScreen';
import ProtectedRoute from './ProtectedRoute';
import LoginScreen from './screens/LoginScreen';
import ClientHomeScreen from './screens/ClientHomeScreen';
import ClientObtainTicketScreen from './screens/ClientObtainTicketScreen';
import ClientVIewTicketsScreen from './screens/ClientViewTicketsScreen';

function App() {
  return (
      <Router>
        <Routes>
          {/* login from /login and based on your credentials and your role you will be directed to your service {client, agent or admin} */}
          <Route path="/" element={<WelcomeScreen />} /> 
          <Route path="/" element={<ProtectedRoute><WelcomeScreen /></ProtectedRoute>} />
          <Route path="/login" element={<LoginScreen />} />
          {/* the client will */}
          <Route path="/client" element={<ClientHomeScreen />} />
          <Route path="/client_view_tickets" element={<ClientVIewTicketsScreen />} />
          <Route path="/client_obtain_ticket" element={<ClientObtainTicketScreen />} />
          <Route path="/agent" element={<AgentScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/ticket" element={<TicketScreen />} />
        </Routes>
      </Router>
  );
}

export default App;


