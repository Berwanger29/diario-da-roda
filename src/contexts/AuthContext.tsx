import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { clearLoginState, getLoginState, getLoginTokens, saveLoginState } from '../helpers/loginStorage';
import { api } from '../services/axios';

type AuthContextType = {
    isLoggedIn: boolean;
    login: (props: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
};

type LoginProps = {
    email: string;
    password: string;
};

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: async () => { },
    logout: async () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            const tokens = getLoginTokens();
            if (tokens) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
                setIsLoggedIn(true);
            }
            setIsLoading(false);
        };
        checkLogin();
    }, []);

    const login = async ({ email, password }: LoginProps) => {
        try {
            setIsLoading(true);
            const response = await api.post('/session/', { email, password });
            console.log(response.data.response);
            const accessToken = response.data?.response?.session?.access_token;
            const refreshToken = response.data?.response?.session?.refresh_token;

            if (accessToken && refreshToken) {
                await saveLoginState({ accessToken, refreshToken });
                setIsLoggedIn(true);
            } else {
                throw new Error("Login inválido");
            }
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await clearLoginState();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
