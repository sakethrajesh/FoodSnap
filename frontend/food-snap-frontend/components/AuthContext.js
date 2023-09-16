// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    // Check if user data is stored in AsyncStorage when the app starts.
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          // If user data is found, parse it and set the user.
          const parsedUserData = JSON.parse(userData);
          if (parsedUserData.username) {
            setUser(parsedUserData);
          }
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    };

    checkUser();
  }, []);

  const login = async (userData) => {
    // Implement your login logic here and set the user data
    setUser(userData);
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error('Error storing user data:', error);
      }
    
  };

  const logout = async() => {
    // Implement your logout logic here
    setUser(null);
    try {
        await AsyncStorage.removeItem('userData');
      } catch (error) {
        console.error('Error removing user data:', error);
      }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};