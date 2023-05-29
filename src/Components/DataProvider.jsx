import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const value = {
        todos,
        setTodos,
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider >
    )
}

export default UserProvider;