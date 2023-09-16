import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { NativeBaseProvider, Icon, HStack, AddIcon, Stack, Button, Pressable,Text } from "native-base";
import RecipeListElement from "./RecipeListElement.js";
import Toolbar from './Toolbar.js';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';




const DashboardScreen = () => {

  const [recipes, setRecipes] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://107.21.84.60/get_user/hello_world';
    axios.get(apiUrl)
      .then(response => {
        // Handle the response data here
        console.log('Response:', response.data);
        // console.log('data!!!:', response.data.recipes);
        setRecipes(response.data.recipes);
        setProfilePicture(response.data.profile_image_url);
        // console.log(recipes)
        // console.log(recipes)

      })
      .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }, []);
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.scrollView}>
        {/* <View style={styles.container}> */}
        <Toolbar></Toolbar>
        

        {recipes ? recipes.map((item, index) => {
          return (
            <RecipeListElement key={index} imageUrl={item["image_url"]} title={item["name"]} dateCreated={new Date().getFullYear} profilePicture={profilePicture}> </RecipeListElement>
          )
        }) : <Text>Hello World</Text>}
        


        {/* </View> */}
      </ScrollView>
      {/* put camera page instead of recipes page */}
      <Button style={styles.button} onPress = {() => navigation.navigate("CameraScreen")} endIcon={<AddIcon as={AddIcon} name="add" size="sm" />}>
      </Button>
    </NativeBaseProvider >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 50
  },


  button: {
    backgroundColor: '#29C5F6',
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20

  },
});


export default DashboardScreen;