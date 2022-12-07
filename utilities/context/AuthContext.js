import React, { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [app, setApp] = useState(null)
  const login = (email, password) => {
    setUser(true);
    AsyncStorage.setItem('isLoggedIn', user)
  };
  const chooseApp = (appName) => {
    setApp(appName)
  }
  return (
    <AuthContext.Provider value={{user, login,app, chooseApp}}>{children}</AuthContext.Provider>
  );
};
