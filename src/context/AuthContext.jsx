import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Valid credentials
    const validCredentials = [
        { email: 'admin@gmail.com', password: 'admin1234', role: 'admin' },
        { email: 'customer@gmail.com', password: 'customer1234', role: 'customer' }
    ];

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email, password) => {
        const foundUser = validCredentials.find(
            cred => cred.email === email && cred.password === password
        );

        if (foundUser) {
            const userData = { email: foundUser.email, role: foundUser.role };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true, role: foundUser.role };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
