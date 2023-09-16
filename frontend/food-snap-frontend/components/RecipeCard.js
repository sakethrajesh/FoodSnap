import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, HStack, Spacer, Flex, Pressable, Badge, Center, Image,Button} from "native-base";
import { useNavigation } from "@react-navigation/native";

const RecipeCard= () => {
    const navigation = useNavigation();


    return (
        <NativeBaseProvider>
        <Box alignItems="center">
            {/* <Pressable onPress={() => console.log("I'm Pressed")} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5"> */}
                <Box rounded="8" overflow="hidden"  borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="10" height="600">
                    <Text fontSize={20} fontWeight={20} padding={10} color="coolGray.800">
                            Chicken Parmesan
                        </Text>
                    <Center>
                                <Image size={10} width={300} height={400}source={{
                                    uri: "https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1-500x500.jpg"
                                }} alt="Alternate Text" />
                            </Center>
                    <Flex>
                        <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600" >
                            Steps
                        </Text>
                    </Flex>
                </Box>
            {/* </Pressable> */}
        </Box>
        </NativeBaseProvider>
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
    marginVertical:50
  },

});


export default RecipeCard;