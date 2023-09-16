import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle'; // You can choose a different type of progress bar (Circle, Bar, etc.) based on your preference.


const LoadingBar = ({ navigation }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate progress updates (replace this with your actual logic)
        const interval = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress < 1) {
              return prevProgress + 0.5;
            } else {
              clearInterval(interval);
             navigation.navigate('Cards'); // Redirect to the dashboard or next screen
              return 1;
            }
          });
          
        }, 1000);
        
        return () => clearInterval(interval); // Cleanup when the component unmounts
      }, []);
      
    
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ProgressCircle
        progress={progress}
        size={300}
        showsText={true}
        />

        {/* <Text>{Math.round(progress * 100)}%</Text> */}
    </View>
    );
      
  };

export default LoadingBar;
