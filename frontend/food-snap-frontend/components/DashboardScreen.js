import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { NativeBaseProvider, Icon, HStack, AddIcon, Stack, Button, Pressable,Text } from "native-base";
import RecipeListElement from "./RecipeListElement.js";
import Toolbar from './Toolbar.js';
import { useNavigation } from "@react-navigation/native";


const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.scrollView}>
        {/* <View style={styles.container}> */}
        <Toolbar></Toolbar>
        <RecipeListElement></RecipeListElement>
        <RecipeListElement></RecipeListElement>
        <RecipeListElement></RecipeListElement>
        <RecipeListElement></RecipeListElement>
        <RecipeListElement></RecipeListElement>
        <RecipeListElement></RecipeListElement>
        <RecipeListElement></RecipeListElement>

        {/* </View> */}
      </ScrollView>
      {/* put camera page instead of recipes page */}
      <Pressable onPress={() => navigation.navigate("Recipes")} > 
        <Button style={styles.button} onPress = {() => navigation.navigate("Recipes")} endIcon={<AddIcon as={AddIcon} name="add" size="sm" />}>
        </Button>
      </Pressable>
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