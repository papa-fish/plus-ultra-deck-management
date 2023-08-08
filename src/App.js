import { useState } from 'react';
import { getUser } from './utilities/users_service';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import './App.css';

function App() {

  const [user, setUser] = useState(getUser());

  function login(user) {
    setUser(user)
  };

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="App">
      <HomePage 
        user={user}
        onLogout={logout}
      />
      <LoginPage onLogin={login} />
      <SignUpPage />
    </div>
  );
}

export default App;
