import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle'; // You can choose a different type of progress bar (Circle, Bar, etc.) based on your preference.
import axios from 'axios';
import RecipeTinder from "./TinderSwipe";

const LoadingBar = ({ navigation }) => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [steps, setSteps] = useState(null)

    useEffect(() => {

      async function fetchData() {
        setProgress((prevproge) => prevproge + .5)
        const url = 'http://107.21.84.60/api/generateRecipe';
        const data = {
          ingredients: {
            chicken: 1,
            onion: 2,
            carrot: 1,
            potato: 3
          }
        };

        axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(async (response) => {
            console.log(response.data.recipies[0])
            setSteps(response.data.recipies[0]);
            setProgress((x) => x + .5);
            setIsLoading(false);
            console.log("current steps: ",steps);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      }

      

        fetchData();
      }, []);
    
      
    
    return (
      <>
      {steps ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ProgressCircle
          progress={progress}
          size={300}
          showsText={true}
          />
      </View> : <RecipeTinder recipeSteps={steps}></RecipeTinder>}
      </>
      
    );
      
  };

export default LoadingBar;
