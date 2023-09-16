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


const HomeScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatarSource, setAvatarSource] = useState(null);
  
    const handleImagePicker = () => {
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setAvatarSource({ uri: response.uri });
        }
      });
    };
  
    const handleLogin = () => {
      // Implement your login logic here
      console.log(`Username: ${username}, Password: ${password}`);
      navigation.navigate('Dashboard'); // Redirect to the dashboard or next screen
    };
  
    return (
      <View style={styles.container}>
        {avatarSource && (
          <Image source={avatarSource} style={styles.avatar} />
        )}
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.uploadButton}
        >
          <Text>Upload Image</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button title="Login" onPress={handleLogin} />
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
  });

export default HomeScreen;
