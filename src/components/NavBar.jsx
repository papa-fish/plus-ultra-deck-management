import "./NavBar.css"

export default function NavBar({ user, onLogout }) {
    
    return(
        <nav className="nav-bar">
                <li><a href="/">Home</a></li>
                <li><a href="/">Decks</a></li>
                <li><a href="/">Checklist</a></li>
                <li><a href="/">[Chaos] Tamaki Amajiki</a></li>
                { user ?
                    <>
                        <li>Logged in as: {user.email}</li>
                        <button onClick={onLogout}>Logout</button> 
                    </> 
                    : <li><a href="/login">Login</a></li>
                }
        </nav>
    );
};