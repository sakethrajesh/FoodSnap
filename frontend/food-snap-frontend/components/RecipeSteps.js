import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, VStack, Heading, Center, Image, Button, ScrollView, AspectRatio, HStack, Stack,  InfoIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";

const RecipeSteps = ({steps}) => {
    const navigation = useNavigation();


    return (

        <Box width="95%" rounded="lg" overflow="hidden" borderColor="coolGray.200" height="40%" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>
            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                        Steps: 
                    </Heading>
                    <Text fontSize="xs" _light={{
                        color: "violet.500"
                    }} _dark={{
                        color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                        {steps}
                    </Text>
                    <Button style={styles.button} onPress={() => navigation.navigate("Recipe Details",{ steps:steps})} endIcon={<InfoIcon sname="add" size="sm" />}>
                    </Button>
                </Stack>

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
    button: {
        backgroundColor: '#29C5F6',
        width: 33,
        height: 33,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 10
    
      },

});


export default RecipeSteps;