import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, VStack, Heading, Center, Image, Button, ScrollView, AspectRatio, HStack, Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";

const RecipeImage = ({image_url, name}) => {
    const navigation = useNavigation();


    return (


        <Box alignItems="center">
            <Box width="100%" height="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio width="100%" height="100%" ratio={10 / 19}>
                        <Image source={{
                            uri: image_url
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="blue.300" _dark={{
                        bg: "blue.300"
                    }} _text={{
                        
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        {name}
                    </Center>
                </Box>

            </Box>
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

});


export default RecipeImage;