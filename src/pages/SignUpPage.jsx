import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, TextField } from "@mui/material";

export default function SignUpPage() {

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
        axios.post("/users/signup", formData)
            .then(res => {
                console.log(res.data)
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
        <section className="signup-page">
            <h1>sign up</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <TextField 
                    onChange={handleChange} 
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
                    login
                </Button>
            </form>
            <p>Already have an account? <Link to="/users/login">Login here!</Link></p>
        </section>
    );
};