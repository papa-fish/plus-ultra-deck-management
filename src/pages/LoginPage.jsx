import { useState } from "react";
import axios from "axios";

export default function LoginPage({ onLogin }) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/users/login", formData)
            .then(res => {
                let token = res.data;
                localStorage.setItem("token", token);
                onLogin(formData);
            })
            .catch(err => {
                console.log(err.response.status);
                console.log(err.response.data);
                console.log(err.message);
                setError(err.response.data.message);
            });
    };

    return(
        <section className="login-page">
            <h1>login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="email">email</label>
                <input 
                    onChange={handleChange}
                    type="email"
                    id="email" 
                    name="email"
                />
                <label htmlFor="password">password</label>
                <input 
                    onChange={handleChange}
                    type="password"
                    id="password" 
                    name="password"
                />
                <button>login</button>
            </form>
            <p>Don't have an account? <a href="/users/signup">Sign up!</a></p>
        </section>
    );
};