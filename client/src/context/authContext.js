import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async ({email, password}) => {
        const response = await axios.post('http://localhost:3000/auth/login', {
            email,
            password
        });
        setCurrentUser(response.data)
    }
    const logout = async () => {
        const response = await axios.post('http://localhost:3000/auth/logout');
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
}