import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import "./LoginPage.css";

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
                <TextField 
                    onChange={handleChange} 
                    id="outlined-basic" 
                    label="enter email" 
                    variant="outlined" 
                    name="email" 
                    type="email"
                />
                <label htmlFor="password">password</label>
                <TextField 
                    onChange={handleChange} 
                    label="enter password" 
                    variant="outlined" 
                    name="password" 
                    type="password" 
                />
                <Button 
                    style={{ margin: '20px 0 0 0' }} 
                    variant="contained"
                    type="submit">
                    login
                </Button>
            </form>
            <p>Don't have an account? <a href="/users/signup">Sign up!</a></p>
        </section>
    );
};