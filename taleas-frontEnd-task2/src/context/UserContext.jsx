// UserContext.js

import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const isAdmin = localStorage.getItem("isAdmin");
    const userId = localStorage.getItem("userId");

    if (accessToken && userId) {
      setUser({ id: userId, isAdmin: isAdmin === 'true' });
    }
  }, []);

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("userId", newUserData.id);
    localStorage.setItem("isAdmin", newUserData.isAdmin);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
