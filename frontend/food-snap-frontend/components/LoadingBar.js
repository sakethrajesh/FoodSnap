import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle'; // You can choose a different type of progress bar (Circle, Bar, etc.) based on your preference.
import axios from 'axios';
import RecipeTinder from "./TinderSwipe";
import {generatePreSignedUrl} from "../AWS/s3Utils"
import { useRoute } from "@react-navigation/native";


const LoadingBar = ({ navigation }) => {
    const route = useRoute();
    var imageKey = route.params.imageKey;
    var userName = route.params.userName;

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [steps, setSteps] = useState(null)
    const [ingredients, setIngredients] = useState({});
    const [names, setNames] = useState(null)
    const [pictures, setPictures]  = useState(null)

    useEffect(() => {

      const handleGetIngredients = async (signedUrl) => {
        try {
          const response = await axios.post('http://107.21.84.60/api/getIngredients', {
            image_url: signedUrl,
          });
    
          // Assuming the API returns data in the format {"ingredients": {"ingredient1": count1, "ingredient2": count2, ...}}
          setIngredients(response.data.ingredients);

          return response.data;
        } catch (error) {
          console.error('Error:', error);
        }
      };

      async function fetchData() {

        const signImageUrl = await generatePreSignedUrl(imageKey);
        const data = await handleGetIngredients(signImageUrl);

        const url = 'http://107.21.84.60/api/generateRecipe';
        setProgress((x) => x + .5);


        axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(async (response) => {

            console.log(response.data)
            
            const ingredientsArray = [];
            const namesArray = [];
            const stepsArray = [];
            const inputArray = response.data.recipies

            inputArray.forEach(item => {
              ingredientsArray.push(item.ingredients);
              namesArray.push(item.name);
              stepsArray.push(item.steps);
            });

            const pictureUrlArray = [];

            const promises = namesArray.map(item => {
              const apiUrl = `http://107.21.84.60/api/getPicture/${item.replace(/ /g, '-')}`;
              
              return axios.get(apiUrl)
                .then(response => {
                  // Handle the response data here
                  console.log('Response:', response.data);
                  return response.data["picture_url"];
                })
                .catch(error => {
                  // Handle any errors here
                  console.error('Error:', error);
                  return null; // You can decide how to handle errors
                });
            });

            Promise.all(promises)
              .then(pictureUrls => {
                // All requests have completed successfully, and pictureUrls is an array of results.
                console.log('All requests completed');
                console.log(ingredientsArray)
                console.log(namesArray)
                console.log(stepsArray)
                console.log(pictureUrls)

                setPictures(pictureUrls)
                setSteps(stepsArray);
                setIngredients(ingredientsArray)
                setNames(namesArray)
                setProgress((x) => x + .5);
                setIsLoading(false);
                console.log("current steps: ",steps);
              })
              .catch(error => {
                // Handle errors from Promise.all, if any
                console.error('Promise.all Error:', error);
              });


            

            
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      }

      

        fetchData();
      }, []);
    
      
    
    return (
      <>
      {steps && ingredients && names ? 
      <RecipeTinder userName={userName} recipeSteps={steps} imageurls={pictures} listOfIngredients={ingredients} names={names} ></RecipeTinder>  : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProgressCircle
      progress={progress}
      size={300}
      showsText={true}
      />
  </View>}
      </>
      
    );
      
  };

export default LoadingBar;
