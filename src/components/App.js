import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "mFirebase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
        if (user){
            setIsLoggedIn(true);
            setUserObj(user);
        } else {
            setIsLoggedIn(false)
        }
        setInit(true)
        });
    }, [])
    
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
            <footer>&copy; {new Date().getFullYear()} Twitter</footer>
        </>
    );
}

export default App;
