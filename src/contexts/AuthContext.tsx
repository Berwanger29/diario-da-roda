// context/AuthContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { clearLoginState, getLoginState, saveLoginState } from '../helpers/loginStorage';


type AuthContextType = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLogin = () => {
            const logged = getLoginState();
            setIsLoggedIn(logged);
            setIsLoading(false);
        };
        checkLogin();
    }, []);

    const login = () => {
        saveLoginState(true);
        setIsLoggedIn(true);
    };

    const logout = () => {
        clearLoginState();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }
        }>
            {children}
        </AuthContext.Provider>
    );
};
