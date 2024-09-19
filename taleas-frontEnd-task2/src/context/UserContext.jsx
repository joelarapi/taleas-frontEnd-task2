import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../api/api';

const UserContext = createContext();

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  } 
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  const updateAccessToken = useCallback((token) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem('accessToken', token);
      const decodedToken = decodeJwt(token);
      if (decodedToken && decodedToken.id) {
        setUser({ id: decodedToken.id, isAdmin: decodedToken.isAdmin });
      }
    } else {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const { data } = await api.post('/refresh-token');
      const { accessToken } = data;
      updateAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      setUser(null);
      updateAccessToken(null);
      throw error;
    }
  }, [updateAccessToken]);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decodedToken = decodeJwt(token);
          if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
            setUser({ id: decodedToken.id, isAdmin: decodedToken.isAdmin });
            setAccessToken(token);
          } else {
            console.log("Token expired, refreshing...");
            await refreshAccessToken();
          }
        } catch (error) {
          console.error("Error initializing auth:", error);
          updateAccessToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [refreshAccessToken, updateAccessToken]);

  const updateUser = useCallback((newUserData) => {
    setUser(newUserData);
    if (newUserData && newUserData.accessToken) {
      updateAccessToken(newUserData.accessToken);
    }
  }, [updateAccessToken]);

  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
      updateAccessToken(null);
      localStorage.removeItem('refreshToken'); 
    }
  }, [updateAccessToken]);

  const contextValue = {
    user,
    updateUser,
    logout,
    accessToken,
    refreshAccessToken,
    updateAccessToken,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
