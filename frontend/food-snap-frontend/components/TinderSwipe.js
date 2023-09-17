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

const RecipeTinder = () => {
    const navigation = useNavigation();

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
        //if swiped left ignore the recipe, if swiped right then go to recipe page:
        if(direction == 'right'){

            navigation.navigate("Recipes"); //need to fix this ughhh
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <View style={styles.scrollView}>
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
            <RecipeCard></RecipeCard>
        </TinderCard>
           <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
           <RecipeCard></RecipeCard>
       </TinderCard>
          <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
          <RecipeCard></RecipeCard>
      </TinderCard>
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
