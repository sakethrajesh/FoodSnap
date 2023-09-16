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



    return <Box alignItems="center">
        <Flex direction="row" h="58" p="4">
            <Pressable onPress={() => navigation.navigate("Recipes")} >
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
