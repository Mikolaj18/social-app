import {createContext, useEffect, useState} from "react";
import {userLogin} from "../db/auth/userLogin.js";
import {userLogout} from "../db/auth/userLogout.js";

export const AuthContext =  createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser") || null));

    const login = async (credentials) => {
        await userLogin(credentials, setCurrentUser);
    };

    const logout = async () => {
        await userLogout();
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}