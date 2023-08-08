import { useState } from 'react';
import { getUser } from './utilities/users_service';
import NavBar from './components/NavBar';

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
      <NavBar 
        user={user}
        onLogout={logout}
      />
    </div>
  );
}

export default App;
