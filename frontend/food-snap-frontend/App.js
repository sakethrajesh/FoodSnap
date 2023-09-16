import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './components/DashboardScreen';
import HomeScreen from './components/HomeScreen';
import { useAuth, AuthProvider } from './components/AuthContext';
import CameraScreen from './components/CameraScreen';
import LoadingBar from './components/LoadingBar';
import Cards from './components/Cards';
import TinderScreen from './components/TinderScreen';
import RecipeCard from './components/RecipeCard';
import Toolbar from './components/Toolbar';


const Stack = createStackNavigator();


const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Tinder">
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={DashboardScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Recipes" component={RecipeCard} />
          <Stack.Screen options={{ headerShown: false }} name="Toolbar" component={Toolbar} />
          <Stack.Screen options={{ headerShown: false }} name="CameraScreen" component={CameraScreen}/>
          <Stack.Screen options={{ headerShown: false }} name="ProgressBar" component={LoadingBar}/>
          <Stack.Screen options={{ headerShown: false }} name="Cards" component={Cards}/>
          <Stack.Screen options={{ headerShown: false }} name="Tinder" component={TinderScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadButton: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default App;
