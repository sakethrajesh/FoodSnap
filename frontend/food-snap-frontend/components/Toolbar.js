import React, { useState } from 'react';


import {
    Divider, Text,
    Flex,
    Box,
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

const Toolbar = ()=> {

    const navigation = useNavigation();

    const handleSelect = () => {
        // Implement your login logic here
        navigation.navigate("Recipes"); // Redirect to the dashboard or next screen
      };

    return <Box alignItems="center">
        <Flex direction="row" h="58" p="4">
            <Text onClick={handleSelect}>Find Recipes</Text>
            <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
            <Text  onClick={handleSelect}>Dashboard</Text>
            <Divider bg="indigo.500" thickness="2" mx="2" orientation="vertical" />
            <Text onClick={handleSelect}>Logout</Text>
        </Flex>
    </Box>;
};

export default Toolbar;
