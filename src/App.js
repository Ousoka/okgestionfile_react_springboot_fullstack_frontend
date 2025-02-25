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
import AgentHomeScreen from './screens/AgentHomeScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';
import AdminNewUserScreen from './screens/AdminNewUserScreen';
import ClientTicketScreen from './screens/ClientTicketScreen';

function App() {
  return (
      <Router>
        <Routes>
          {/* login from /login and based on your credentials and your role you will be directed to your service {client, agent or admin} */}
          <Route path="/" element={<WelcomeScreen />} /> 
          <Route path="/" element={<ProtectedRoute><WelcomeScreen /></ProtectedRoute>} />
          <Route path="/login" element={<LoginScreen />} />
          {/* the client will */}
          <Route path="/client_home" element={<ClientHomeScreen />} />
          <Route path="/agent_home" element={<AgentHomeScreen />} />
          <Route path="/client_view_tickets" element={<ClientVIewTicketsScreen />} />
          <Route path="/client_obtain_ticket" element={<ClientObtainTicketScreen />} />
          <Route path="/agent_home" element={<AgentHomeScreen />} />
          <Route path="/agent" element={<AgentScreen />} />
          <Route path="/admin_home" element={<AdminHomeScreen />} />
          <Route path="/admin_dashboard" element={<AdminScreen />} />
          <Route path="/admin_users" element={<AdminUsersScreen />} />
          <Route path="/admin_new_user" element={<AdminNewUserScreen />} />
          {/* <Route path="/ticket" element={<TicketScreen />} /> */}
          <Route path="/ticket" element={<ClientTicketScreen />} />

        </Routes>
      </Router>
  );
}

export default App;


