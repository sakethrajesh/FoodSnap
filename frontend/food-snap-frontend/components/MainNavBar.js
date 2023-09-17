import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Text, Icon, HStack, Box, StatusBar, IconButton, MaterialIcons, Badge, Center, VStack, Menu, Image, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/FoodSnapLogo.png";

function MainNavBar() {
    const navigation = useNavigation();

    const [shouldOverlapWithTrigger] = React.useState(false);
    const [position, setPosition] = React.useState("auto");
    const [people, setPeople] = useState(null);

    return <>
        <StatusBar bg="blue.200" barStyle="light-content" marginTop={50} />
        {/* <Box safeAreaTop bg="blue.200" /> */}
        <HStack bg="blue.200" px="1" py="4" justifyContent="space-between" alignItems="center" w="100%" >
            <HStack alignItems="center" >
                <Badge bg="blue.200" marginTop={30}>
                    <Center>
                        <VStack space={6} alignSelf="flex-start" w="100%">
                            <Menu w="150" shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                                placement={position == "auto" ? undefined : position} trigger={triggerProps => {
                                    return <Button bg="blue.200" borderRadius={10} {...triggerProps}>
                                        <Image width="150" height="50" borderRadius={10} source={{
                                            uri: "https://foodsnaps3.s3.amazonaws.com/FoodSnapLogo.png"
                                        }} alt="Alternate Text" />
                                    </Button>
                                }}>
                                <Menu.Item onPress={() => navigation.navigate("Login")}>Logout</Menu.Item>
                                <Menu.Item  onPress={() => navigation.navigate("Home")}>Sign Up</Menu.Item>
                            </Menu>
                        </VStack>

                    </Center>
                </Badge>
            </HStack>
            <Badge bg="blue.200" marginTop={30}>
                <Center>
                    <Image size={60} borderRadius={100} source={{
                        uri: "https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1-500x500.jpg"
                    }} alt="Alternate Text" />
                    <Text>Username</Text>
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