
import React from 'react';
import { useAuthStore } from './store/authStore';
import Login from './components/Login';
import PrivateLayout from './components/PrivateLayout';

const App: React.FC = () => {
  const user = useAuthStore(s => s.user);
  return user ? <PrivateLayout /> : <Login />;
};

export default App;
