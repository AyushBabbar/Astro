import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from "../screens/HomeScreen";
import {JournalScreen} from "../screens/JournalScreen";


export const RootNavigator = () => {
    const Stack = createNativeStackNavigator();

    return <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Jounal"
                component={JournalScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>
}