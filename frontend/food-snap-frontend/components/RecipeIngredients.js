import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView ,
  ImageBackground
} from 'react-native';
import { NativeBaseProvider, Box, HStack, Spacer, Flex, Pressable, Badge, Center, Image, Button, Stack, Heading, ScrollView, SectionList } from "native-base";
import { useNavigation } from "@react-navigation/native";



const RecipeIngredients = () => {
  const navigation = useNavigation();
  const INGREDIENTS = [
    {
      title: 'Ingredients',
      data: ['Pizza', 'Burger', 'Risotto', 'Corn', 'Beef', 'Pepper', 'Donuts', 'Lemons', 'Bagels', 'Parsely', 'White Rice', 'Chicken', 'Carrots', 'Apricots', 'Apples'],
    },
  ];


  return (
    
      <Box width="50%" rounded="lg" overflow="hidden" borderColor="coolGray.200" height="80" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <Stack p="4" space={3}>

          <SectionList
            sections={INGREDIENTS}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text  style={styles.header}>{title} </Text>
            )}
          />
        </Stack>
      </Box>

  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 50
  },
  item: {

    marginVertical: 3,
  },
  header: {
    borderRadius: 33,
    fontSize: 28,
    marginBottom: 10,

  },


});


export default RecipeIngredients;