import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from 'mFirebase';
import React, { useState } from "react";

const inputStyles = {};

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {name, value} = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name==="password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data)
        } catch (error) {
            setError(error.message);
        }
    }

const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
       <form onSubmit={onSubmit} className="container">
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} className="authInput"/>
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"/>
        <input type="submit" className="authInput authSubmit" value={newAccount ? "Create Account" : "Sign In"} />
        {error}
        {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Log in" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;