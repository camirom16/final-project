import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedData = sessionStorage.getItem('currentUser');
        const parsedData = storedData ? JSON.parse(storedData) : null;
        return parsedData;
    });

    //Logic to logout the user clearing the user data in sessionStorage and redirecting the user to the home page. 
    const logout = () => {
        sessionStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
