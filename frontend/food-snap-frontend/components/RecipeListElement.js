import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, HStack, Spacer, Flex, Pressable, Badge, Center, Image, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { generatePreSignedUrl } from "../AWS/s3Utils.js"


const RecipeListElement = ({ imageUrl, title, dateCreated, profilePicture, name, steps, ingredients}) => {
    const navigation = useNavigation();
    const [photoUrl, setPhotoUrl] = useState(null);
    const [profile_image_url, setProfile_image_url] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const imageUrl_ = await generatePreSignedUrl(imageUrl);
                const profileUrl_ = await generatePreSignedUrl(profilePicture);
                setPhotoUrl(imageUrl_);
                setProfile_image_url(profileUrl_)
            } catch (error) {
                // Handle the error here
                console.error('Error retrieving photo:', error);
            }
        };

        fetchPhoto();
    }, [imageUrl, profilePicture]);


    const handleReadMore = () => {
        // Implement your login logic here
        navigation.navigate("Recipes"); // Redirect to the dashboard or next screen
    };
    return (
        // <NativeBaseProvider>
        <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate("Recipes", {
                image_url: photoUrl,
                ingredients: ingredients,
                steps: steps,
                name:name

            })} >
            <Box rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">

                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {title}
                </Text>
                <Center>
                    <Image size={10} width={300} height={50} source={{
                        uri: photoUrl
                    }} alt="Alternate Text" />
                </Center>

                <HStack alignItems="center">
                    <Badge>
                        <Center>
                            <Image size={5} borderRadius={100} source={{
                                uri: profile_image_url
                            }} alt="Alternate Text" />
                        </Center>
                    </Badge>
                    <Spacer />
                    <Text fontSize={10} color="coolGray.800">
                        {dateCreated}
                    </Text>
                </HStack>
                <Flex>
                    <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                        Read More
                    </Text>
                </Flex>
            </Box>
        </Pressable>
        </Box >
    );

};



export default RecipeListElement;