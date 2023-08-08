import { useState } from 'react';
import { getUser } from './utilities/users_service';
import { Link, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import './App.css';

function HomePage() {
  return(
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

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
        <p>Logged in as: {user.email}</p>
        <Link onClick={logout} to="/">Logout</Link> </> :
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
