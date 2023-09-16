import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Text, Icon, HStack, Box, StatusBar, IconButton, MaterialIcons, Badge, Center, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/FoodSnapLogo.png";
function MainNavBar() {
    return <>
        <StatusBar bg="#3700B3" barStyle="light-content" />
        <Box safeAreaTop bg="violet.600" />
        <HStack bg="blue.200" px="1" py="5" justifyContent="space-between" alignItems="center" w="100%" >
            <HStack alignItems="center">
                <Badge bg="blue.200">
                    <Center>
                        <Image size={60} borderRadius={100} source={{
                            uri: logo
                        }} alt="Alternate Text" />
                    </Center>
                </Badge>
            </HStack>
            <Badge bg="blue.200">
                <Center>
                    <Image size={60} borderRadius={100} source={{
                        uri: "https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1-500x500.jpg"
                    }} alt="Alternate Text" />
                </Center>
            </Badge>
        </HStack>
    </>;
}

export default MainNavBar;
//   function Example() {
//     return <Center>
//         <AppBar />
//       </Center>;
//   }