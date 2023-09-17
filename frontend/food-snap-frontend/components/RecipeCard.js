import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, HStack, Badge, Center, Image, Button, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import RecipeSteps from "./RecipeSteps"
import RecipeIngredients from "./RecipeIngredients"
import RecipeImage from "./RecipeImage"
import FoodPrefsBar from './FoodPrefsBar';
import Toolbar from './Toolbar.js';

const RecipeCard = ({ imageurl, listOfIngredients, recipeSteps, name }) => {
    const navigation = useNavigation();
    const route = useRoute();
    var image_url = '';
    var ingredients = '';
    var steps = '';
    var _name = '';
    if (listOfIngredients !== undefined && listOfIngredients !== null && listOfIngredients.length !== 0) {
        ingredients = listOfIngredients.join("\r\n");
        steps = recipeSteps;
        _name = name;

    } else {
        try {
            image_url = route.params.image_url;
            ingredients = route.params.ingredients;
            steps = route.params.steps;
            _name = route.params.name;
            console.log("in here!!!");
        }
    
        catch {
            try {
                image_url = imageurl;
                ingredients = listOfIngredients.join("\r\n");
                steps = recipeSteps;
                _name = name;
            }
            catch {
                //should change this catch to be the props
                image_url = "https://www.splashlearn.com/math-vocabulary/wp-content/uploads/2022/05/graphs-9-01-1.png";
                ingredients = "ingredie"
                steps = "steps"
                _name = "chick"
            }
        }
        
    }
    

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <HStack space={2} justifyContent="center">
                    <RecipeImage name={_name} image_url={image_url}></RecipeImage>
                    <RecipeIngredients ingredients={ingredients}></RecipeIngredients>
                </HStack>
                <RecipeSteps steps={steps}></RecipeSteps>
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