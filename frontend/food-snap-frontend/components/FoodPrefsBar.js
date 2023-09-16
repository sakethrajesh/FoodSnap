import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { NativeBaseProvider, HStack, Center, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Tooltip } from "native-base";
import GrassIcon from '@mui/icons-material/Grass';

const FoodPrefsBar = () => {
    return <Center>
        <HStack space={3}>
            {/* <Tooltip popover={<Text>my explanation</Text>} backgroundColor={'rgb(240, 179, 16)'}>
                <View style={{ height: 20, alignSelf: 'stretch', justifyContent: 'center',  }}>
                <Icon as={GrassIcon} name="add" size="sm" />
                </View>
            </Tooltip> */}
{/* 
            <Tooltip popover={<Text>my explanation</Text>} backgroundColor={'rgb(240, 179, 16)'}>
                <View style={{ height: 20, alignSelf: 'stretch', justifyContent: 'center',  }}>
                <Icon as={AddIcon} name="add" size="sm" />
                </View>
            </Tooltip>
            <Tooltip popover={<Text>my explanation</Text>} backgroundColor={'rgb(240, 179, 16)'}>
                <View style={{ height: 20, alignSelf: 'stretch', justifyContent: 'center',  }}>
                <Icon as={AddIcon} name="add" size="sm" />
                </View>
            </Tooltip> */}
        </HStack>
    </Center>;
};

export default FoodPrefsBar;