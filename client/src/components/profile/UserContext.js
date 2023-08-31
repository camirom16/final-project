import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedData = sessionStorage.getItem('currentUser');
        const parsedData = storedData ? JSON.parse(storedData) : null;
        return parsedData;
    });

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
