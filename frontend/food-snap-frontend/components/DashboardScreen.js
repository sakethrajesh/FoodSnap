import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { NativeBaseProvider, Icon, HStack, AddIcon, Stack, Center, Button, Pressable, Text } from "native-base";
import RecipeListElement from "./RecipeListElement.js";
import Toolbar from './Toolbar.js';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import MainNavBar from './MainNavBar.js';




const DashboardScreen = () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://107.21.84.60/get_users';
    axios.get(apiUrl)
      .then(response => {
        // Handle the response data here
        console.log('Response:', response.data);
        setPeople(response.data)

      })
      .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }, []);
  const navigation = useNavigation();

  return (

    <NativeBaseProvider>
      <Center>
        <MainNavBar></MainNavBar>
      </Center>
      <ScrollView style={styles.scrollView}>

        {people ? (
          people.map((item, i) => {
            return item.recipes.map((recipe, index) => (
              <RecipeListElement
                key={index}
                imageUrl={recipe["image_url"]}
                title={item["name"]}
                dateCreated={new Date().getFullYear()} // This should be a function call
                profilePicture={item["profile_image_url"]}
              />
            ));
          })
        ) : (
          <Text>Hello World</Text>
        )}

        

        {/* {recipes ? recipes.map((item, index) => {
          return (
            <RecipeListElement key={index} imageUrl={item["image_url"]} title={item["name"]} dateCreated={new Date().getFullYear} profilePicture={profilePicture}> </RecipeListElement>
          )
        }) : <Text>Hello World</Text>} */}
        

      </ScrollView>
      {/* put camera page instead of recipes page */}
      <Button style={styles.button} onPress={() => navigation.navigate("CameraScreen")} endIcon={<AddIcon as={AddIcon} name="add" size="sm" />}>
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