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
import axios from 'axios';

const Login = ({ navigation, setUserName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);


  const handleLogin = async () => {
    console.log(`Username: ${username}, Password: ${password}`);
    const apiUrl = `http://107.21.84.60/get_user/${username}`;

    // Make the GET request using Axios
    axios.get(apiUrl)
      .then(response => {
        // Handle success, you can access the response data using response.data
        if (response.data.password == password) {
          navigation.navigate('Dashboard'); // Redirect to the dashboard or next screen
        } else {
          console.log("Wrong password!!")
          setErrorMessage("Wrong password!!")
        }

      })
      .catch(error => {
        // Handle error
        console.error(error);
        console.log("User doesn't exist")
        setErrorMessage(`${username} user doesn't exist`)

      });
    setUserName(username)
  };
  const click = async () => {
    navigation.navigate('Home'); // Redirect to the dashboard or next screen
  };
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Login</Text>
      {errorMessage ?
        <Text>{errorMessage}</Text> : <></>}
      <View style={{ marginTop: 30 }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />


      <Button title="SignUp" onPress={click} />

    </View>
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
  imageContainer: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: 100, // Adjust the radius for more or less rounding
  },
  h1: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: 'bold', // You can use 'bold' for a bold style
    marginTop: 20, // Add margin to control spacing
  },
});

export default Login;
