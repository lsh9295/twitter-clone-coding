import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "mFirebase";
import { updateProfile, updateCurrentUser } from "@firebase/auth";
function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
        if (user){
            setUserObj({
                displayName: user.displayName,
                uid: user.uid,
                updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
                });
        } else {
            setUserObj(null);
        }
        setInit(true)
        });
    }, [])

    const refreshUser = async () => {
        await updateCurrentUser(authService, authService.currentUser);
        setUserObj(authService.currentUser);
    };
        
    return (
        <>
            {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
            <footer>&copy; {new Date().getFullYear()} Twitter</footer>
        </>
    );
}

export default App;
