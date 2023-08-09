import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, TextField } from "@mui/material";
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {

    const navigate = useNavigate();

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
                navigate("/");
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
            <form onSubmit={handleSubmit} >
                <TextField 
                    onChange={handleChange} 
                    id="outlined-basic" 
                    label="enter email" 
                    variant="outlined" 
                    name="email" 
                    type="email"
                />
                <TextField 
                    onChange={handleChange} 
                    style={{ margin: '20px 0 0 0' }}
                    label="enter password" 
                    variant="outlined" 
                    name="password" 
                    type="password" 
                />
                <Button 
                    style={{ margin: '20px 0 0 0' }} 
                    variant="contained"
                    type="submit">
                    Login
                </Button>
            </form>
            <p>Don't have an account? <Link to="/users/signup">Sign up!</Link></p>
        </section>
    );
};