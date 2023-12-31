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
import RecipeCard from './components/RecipeCard';
import Toolbar from './components/Toolbar';
import RecipeDetails from './components/RecipeDetails';
import TinderSwipe from './components/TinderSwipe';
import Login from './components/Login'
// import dotenv from 'dotenv';
// import 'dotenv/config'; // This line loads the environment variables from .env
const Stack = createStackNavigator();


const App = () => {
  // dotenv.config();
  // Load environment variables from .env

  const [userName, setUserName] = useState('');

  const userNameCallBack = (name) => {
    console.log('hereeeee')
    console.log(name)
    
    setUserName(name);
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name='Home'>
            {(props) => <HomeScreen {...props} setUserName={userNameCallBack} />}
          </Stack.Screen>
          {/* <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={DashboardScreen} /> */}
          <Stack.Screen options={{ headerShown: false }} name='Dashboard'>
            {(props) => <DashboardScreen {...props} userName={userName} />}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: false }} name="Recipes" component={RecipeCard} />
          <Stack.Screen options={{ headerShown: false }} name="Toolbar" component={Toolbar} />
          <Stack.Screen options={{ headerShown: false }} name="CameraScreen" >
            {(props) => <CameraScreen {...props} userName={userName} />}

          </Stack.Screen>

          <Stack.Screen options={{ headerShown: false }} name="ProgressBar" component={LoadingBar} />
          

          <Stack.Screen options={{ headerShown: false }} name="Recipe Details" component={RecipeDetails} />
          <Stack.Screen options={{ headerShown: false }} name='Tinder'>
            {(props) => <TinderSwipe {...props} userName={userName} />}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: false }} name='Login'>
            {(props) => <Login {...props} setUserName={userNameCallBack} />}
          </Stack.Screen>

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
