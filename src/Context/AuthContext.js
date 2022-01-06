import React, { createContext } from 'react';
import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
    const { authenticated, username, tipo, fazerLogin, fazerLogout } = useAuth();


    return (
        <Context.Provider value={{ authenticated, username, tipo, fazerLogin, fazerLogout}} >
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider};