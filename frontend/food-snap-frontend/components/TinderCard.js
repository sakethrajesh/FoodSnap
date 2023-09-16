import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TinderCard = ({ name, age, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.age}>{age}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: 400,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  cardInfo: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 18,
  },
});

export default TinderCard;
