import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, Heading,ScrollView,  Stack,  } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Toolbar from './Toolbar.js';
import GraphCard from './GraphCard.js';

const RecipeDetails = (steps) => {
    const navigation = useNavigation();


    return (
        <NativeBaseProvider>
            <ScrollView style={styles.scrollView}>
            <Box marginTop={50} width="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" height="50%" borderWidth="1" _dark={{
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
                          {steps["route"]["params"]["steps"]["steps"]}
                        </Text>
                    </Stack>

                </Stack>
            </Box>
            <GraphCard></GraphCard>
            </ScrollView>
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
        // flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
   
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


export default RecipeDetails;