import React, { useState } from 'react';
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
import ImagePicker from 'react-native-image-picker';
import DashboardScreen from './components/DashboardScreen';
import HomeScreen from './components/HomeScreen';
import RecipeCard from './components/RecipeCard';
import Toolbar from './components/Toolbar';
import RecipeDetails from './components/RecipeDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Dashboard" component={DashboardScreen} />
        <Stack.Screen   options={{ headerShown: false }} name="Recipes" component={RecipeCard} />
        <Stack.Screen  options={{ headerShown: false }} name="Toolbar" component={Toolbar} />
        <Stack.Screen  options={{ headerShown: false }} name="Recipe Details" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
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
