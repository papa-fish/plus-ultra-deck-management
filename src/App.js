import { useState } from 'react';
import { getUser } from './utilities/users_service';
import { Link, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';

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

    <nav className='nav-bar'>
      <Link to="/">Home</Link>
      <Link to="/decks">Decks</Link>
      <Link to="/checklist">Checklist</Link>
      <Link to="/currentdeck">Current Deck</Link>
      { user ? <>
        <li>Logged in as: {user.email}</li>
        <Link onClick={logout} to="/users/login">Logout</Link> </> :
        <Link to="/users/login">Login</Link> 
      }
    </nav>
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/login" element={<LoginPage onLogin={login}/>} />
      <Route path="/users/signup" element={<SignUpPage />} />
    </Routes>

    <footer>
      &copy; {new Date().getFullYear()}
    </footer>

    </div>
  );
}

export default App;
