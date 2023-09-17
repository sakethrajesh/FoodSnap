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
import { useAuth } from './AuthContext'; // Import the useAuth hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { uploadPhotoToS3 } from '../AWS/s3Utils';
import axios from 'axios';

const HomeScreen = ({ navigation, setUserName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const croppedImage = await manipulateAsync(
        result.assets[0].uri,
        [
          {
            resize: {
              width: 150,
              height: 150,
            },
          },
        ],
        { compress: 1, format: 'png' }
      );
      setImage(croppedImage.uri);
    }
  };

  const addUser = async (uri) => {
    try {
      const url = 'http://107.21.84.60/add_user';
      const data = {
        username: username,
        password: password,
        profile_image_url: uri,
        recipes: [],
        friends: [],
      };
  
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Handle the response here
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    // Implement your login logic here
    let url = "";
    if (image !== null) {
      url = await uploadPhotoToS3({name: image})
    }
    addUser(url);
    console.log(`Username: ${username}, Password: ${password}`);
    setUserName(username)
    navigation.navigate('Dashboard'); // Redirect to the dashboard or next screen
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
      </View>
      <View style={{ marginTop: image ? 20 : 0 }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text) }
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
      <Button title="Sign Up" onPress={handleLogin} />
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
});

export default HomeScreen;
