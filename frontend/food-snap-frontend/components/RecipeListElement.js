import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, HStack, Spacer, Flex, Pressable, Badge, Center, Image, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const RecipeListElement = () => {
    const navigation = useNavigation();

    const handleReadMore = () => {
        // Implement your login logic here
        navigation.navigate("Recipes"); // Redirect to the dashboard or next screen
    };
    return (
        // <NativeBaseProvider>
        <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate("Recipes")} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
            <Box rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">

                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    I made this today
                </Text>
                <Center>
                    <Image size={10} width={300} height={50} source={{
                        uri: "https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1-500x500.jpg"
                    }} alt="Alternate Text" />
                </Center>
     
                <HStack alignItems="center">
                    <Badge>
                        <Center>
                            <Image size={5} borderRadius={100} source={{
                                uri: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=1060&t=st=1694838776~exp=1694839376~hmac=1976f1e7ee25958475e301f0daf53a0ec8056634371ca370eeef62cc9c951bf4"
                            }} alt="Alternate Text" />
                        </Center>
                    </Badge>
                    <Spacer />
                    <Text fontSize={10} color="coolGray.800">
                        1 minute ago
                    </Text>
                </HStack>
                <Flex>
                    <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                        Read More
                    </Text>
                </Flex>
            </Box>
            </Pressable>
        </Box>
        // </NativeBaseProvider>
    );

};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   uploadButton: {
//     marginBottom: 20,
//   },
//   input: {
//     width: 300,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingLeft: 10,
//   },
// });


export default RecipeListElement;