import React, { useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { NativeBaseProvider, } from "native-base";
import RecipeListElement  from "./RecipeListElement.js";
import Toolbar from './Toolbar.js';


const DashboardScreen = () => {
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      <Toolbar></Toolbar>
      <RecipeListElement></RecipeListElement>
      <RecipeListElement></RecipeListElement>
      <RecipeListElement></RecipeListElement>
    </View>
    </NativeBaseProvider>
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


export default DashboardScreen;