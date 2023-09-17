import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, Box, VStack, Heading, Center, Image, Button, ScrollView,  HStack, Stack,  AspectRatio, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

const GraphCard = () => {
    return <Box alignItems="center">
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
              uri: "https://www.splashlearn.com/math-vocabulary/wp-content/uploads/2022/05/graphs-9-01-1.png"
            }} alt="image" />
            </AspectRatio>
 
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                Waste Saved
              </Heading>
              <Text fontSize="xs" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
                Visualization of the Waste you've saved with your recipes this week
              </Text>
            </Stack>
            <Text fontWeight="400">
              This part isn't implemented yet but with the future of this app we plan to highlight
              how much waste you've saved by using the recipes designed to use the ingredients you have and 
              are trying to get rid of.
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>;
  };

export default GraphCard;