import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyAuth = async () => {
    setIsLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
    } catch (error) {
      //
    }
    setIsLoading(false);
  };

  const saveUserAuth = async (userData) => {
    setIsLoading(true);
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem("userData", jsonValue);
      setUser(userData);
    } catch (error) {
      //
    }
    setIsLoading(false);
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        saveUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
