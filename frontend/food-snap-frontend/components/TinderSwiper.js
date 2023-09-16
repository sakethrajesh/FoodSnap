import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

import TinderCard from './TinderCard';

const TinderSwiper = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const nextCard = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        if (index < currentIndex) return null;

        if (index === currentIndex) {
          return (
            <PanGestureHandler
              key={index}
              onGestureEvent={(event) => {
                translateX.value = event.nativeEvent.translationX;
              }}
              onEnd={() => {
                if (translateX.value > 100) {
                  // Swipe right
                  translateX.value = withSpring(400, { damping: 2, stiffness: 70 });
                  nextCard();
                } else if (translateX.value < -100) {
                  // Swipe left
                  translateX.value = withSpring(-400, { damping: 2, stiffness: 70 });
                  nextCard();
                } else {
                  // Return to the original position
                  translateX.value = withSpring(0);
                }
              }}
            >
              <Animated.View style={[styles.cardContainer, animatedStyle]}>
                <TinderCard {...item} />
              </Animated.View>
            </PanGestureHandler>
          );
        }

        return (
          <View key={index} style={styles.cardContainer}>
            <TinderCard {...item} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'absolute',
    width: '100%',
  },
});

export default TinderSwiper;
