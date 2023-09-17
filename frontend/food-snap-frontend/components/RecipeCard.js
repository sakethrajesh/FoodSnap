import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, HStack, Badge, Center, Image, Button, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import RecipeSteps from "./RecipeSteps"
import RecipeIngredients from "./RecipeIngredients"
import RecipeImage from "./RecipeImage"
import FoodPrefsBar from './FoodPrefsBar';
import Toolbar from './Toolbar.js';

const RecipeCard = ({imageurl, listOfIngredients, recipeSteps}) => {
    const navigation = useNavigation();


    return (
        <NativeBaseProvider>
            <View style={styles.container}>
            <HStack space={2} justifyContent="center">
                <RecipeImage></RecipeImage>
                <RecipeIngredients></RecipeIngredients>
            </HStack>
                <RecipeSteps></RecipeSteps>
            </View>
        </NativeBaseProvider>

    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 10,
        marginVertical: 50
    },
    scrollView: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 50
    },

});


export default RecipeCard;