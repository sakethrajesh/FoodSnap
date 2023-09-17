import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Text, Icon, HStack, Box, StatusBar, IconButton, MaterialIcons, Badge, Center, VStack, Menu, Image, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/FoodSnapLogo.png";
import { generatePreSignedUrl } from "../AWS/s3Utils.js"
import axios from 'axios';

function MainNavBar({ imageUrl, profilePicture, userName }) {
    const navigation = useNavigation();

    const [shouldOverlapWithTrigger] = React.useState(false);
    const [position, setPosition] = React.useState("auto");
    const [people, setPeople] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [profile_image_url, setProfile_image_url] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVnZPLuYvrDxMg_xem78oxtALmdFuGq6cb4I1Edsd7qQ&s");

    useEffect(() => {
        const fetchPhoto = async () => {
            const user = userName["userName"];
            
            const apiUrl2 = 'http://107.21.84.60/get_user/' + user

            console.log("logged: " +apiUrl2);

            // Make the GET request using Axios
            axios.get(apiUrl2)
                .then(response => {
                    console.log("AHHHHHHH "+ apiUrl2);
                    // Handle success, you can access the response data using response.data
                    // console.log("URLLLLLLLLLLLL:" +apiUrl2["profile_image_url"])
                    // try {
                    //     const profileUrl_ =  generatePreSignedUrl(apiUrl2["profile_image_url"]);
                    //     setProfile_image_url(profileUrl_)
                    // } catch (error) {
                    //     // Handle the error here
                    //     console.error('Error retrieving photo:', error);
                    // }
                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                    console.log("User doesn't exist")
                });
           
        };

        fetchPhoto();
    }, [imageUrl, profilePicture]);

    const getUserPic = async () => {

        const user = userName;
        const apiUrl2 = `http://107.21.84.60/get_user/` + user;
        console.log("AHHHHHHH" + apiUrl)
        // Make the GET request using Axios
        axios.get(apiUrl2)
            .then(response => {
                // Handle success, you can access the response data using response.data
                console.log(apiUrl2["profile_image_url"])
                return apiUrl2["profile_image_url"];
            })
            .catch(error => {
                // Handle error
                console.error(error);
                console.log("User doesn't exist")
            });
    };

    return <>
        <StatusBar bg="blue.200" barStyle="light-content" marginTop={50} />
        <HStack bg="blue.200" px="1" py="2" justifyContent="space-between" alignItems="center" w="100%" >
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
                                <Menu.Item onPress={() => navigation.navigate("Home")}>Sign Up</Menu.Item>
                            </Menu>
                        </VStack>

                    </Center>
                </Badge>
            </HStack>
            <Badge bg="blue.200" marginTop={30}>
                <Center>
                    <Image size={60} borderRadius={100} source={{
                        uri: profile_image_url
                    }} alt="Profile Photo" />
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