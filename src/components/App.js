import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "mFirebase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
        if (user){
            setUserObj(user);
        } else {
        }
        setInit(true)
        });
    }, [])

    return (
        <>
            {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
            <footer>&copy; {new Date().getFullYear()} Twitter</footer>
        </>
    );
}

export default App;
