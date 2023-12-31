import React, { useState } from 'react';


import {
    Divider, Text,
    Flex,
    Box, Pressable,
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

const Toolbar = () => {

    const navigation = useNavigation();



    return <Box alignItems="center" marginBottom={5}>
        <Flex direction="row" h="58" p="4">
        <Pressable onPress={() => navigation.navigate("Recipes", {
                image_url: 'https://www.splashlearn.com/math-vocabulary/wp-content/uploads/2022/05/graphs-9-01-1.png',
                ingredients: 'chicken \n beef \n corn \n stew \n avocados',
                steps: 'preheat oven \n cook chicken \n boil sauce \n sprinkle seasoning',
                name: 'chicken parm'

            })} >
                <Text >Find Recipes</Text>
            </Pressable>
            <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
            <Pressable onPress={() => navigation.navigate("Tinder")} >
                <Text >Tinder</Text>
            </Pressable>
            <Divider bg="indigo.500" thickness="2" mx="2" orientation="vertical" />
            <Pressable onPress={() => navigation.navigate("Login")} >
                <Text >Logout</Text>
            </Pressable>
        </Flex>
    </Box>;
};

export default Toolbar;
