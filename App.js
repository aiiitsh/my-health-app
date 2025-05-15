// App.js
import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import TabNavigator from './src/navigation/TabNavigator';

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null); // user: { role: 'doctor' or 'patient', ... }
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <TabNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
