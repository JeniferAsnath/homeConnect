import React, { createContext, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyAuth = () => {
    const userData = AsyncStorage.get('userData');
    setUser(
      JSON.parse(userData)
    )
    setIsLoading(false);
  }

  const saveUserAuth = (userData) => {
    setIsLoading(true);
    const userData = AsyncStorage.set('userData', JSON.stringify(userData));
    setUser(userData);
    setIsLoading(false);
  }

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        saveUserAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
