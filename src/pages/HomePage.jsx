import NavBar from "../components/NavBar";

export default function HomePage({ user, onLogout, onLogin }) {    

    return(
        <div>
            <NavBar 
                user={user}
                onLogout={onLogout}
                onLogin={onLogin}
            />
        </div>
    );
};
