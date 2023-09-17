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

const RecipeTinder = ({ imageurls, listOfIngredients, recipeSteps, names, userName }) => {
    const navigation = useNavigation();

    const [currentElement, setCurrentElement] = useState(0);

    const addRecipe = async () => {

            const apiUrl = `http://107.21.84.60/add_recipe/${userName}`;

            const requestData = {
                name: 'New Recipe',
                category: 'Dessert',
                image_url: 'https://foodsnaps3.s3.amazonaws.com/Good_Food_Display_-_NCI_Visuals_Online.jpg',
                steps: ['Step 1', 'Step 2', 'Step 3'],
                ingredients: ['Ingredient 1', 'Ingredient 2'],
            };

            axios({
            method: 'post',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestData,
            })
            .then((response) => {
                // Handle success
                console.log('Recipe added successfully:', response.data);
            })
            .catch((error) => {
                // Handle error
                console.error('Error adding recipe:', error);
            });

    };

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
        // console.log("asjkdaksjd", index)
        //if swiped left ignore the recipe, if swiped right then go to recipe page:
        if (direction == 'right') {
            navigation.navigate("Recipes", {
                image_url: imageurls[currentElement],
                ingredients: listOfIngredients[currentElement],
                steps: recipeSteps[currentElement],
                name: names[currentElement]
                
            }); //need to fix this ughhh
            addRecipe()
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
        setCurrentElement((x) => (x + 1))
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
                        imageurl={imageurls[index]}
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
