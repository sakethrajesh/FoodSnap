import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, Heading, ScrollView, Stack, } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Toolbar from './Toolbar.js';
import TinderCard from 'react-tinder-card'
import RecipeCard from './RecipeCard.js'

import axios from 'axios';

const RecipeTinder = ({ imageurl, listOfIngredients, recipeSteps, names, userName }) => {
    const navigation = useNavigation();

    const addRecipe = async () => {
        try {
            console.log(userName)
            const userString = userName
            const url = "http://107.21.84.60/add_recipe/"+ userString;
            console.log(url)
            const data = {
                name: name,
                category: "N/A",
                image_url: imageurl,
                steps: recipeSteps,
                ingredients: listOfIngredients
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

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
        //if swiped left ignore the recipe, if swiped right then go to recipe page:
        if (direction == 'right') {
            navigation.navigate("Recipes", {
                image_url: imageurl,
                ingredients: listOfIngredients,
                steps: recipeSteps,
                name: 'chicken parm'
                
            }); //need to fix this ughhh
            addRecipe()
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <View style={styles.scrollView}>

            {names.map((name, index) => (
                <TinderCard
                key={index}
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen(name)}
                preventSwipe={['up', 'down']}
                >
                    <RecipeCard
                        imageurl={imageurl}
                        listOfIngredients={listOfIngredients[index]}
                        recipeSteps={recipeSteps[index]}
                        name={name}
                    ></RecipeCard>
                </TinderCard>
            ))}

        </View>
    )
}
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
export default RecipeTinder;
