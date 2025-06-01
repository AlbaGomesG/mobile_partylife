import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./bottomTabNavigator";
import LogIn from '../pages/logIn';

import Feed from "../pages/Feed";
import EventDetails from "../pages/EventsDetails";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
            <Stack.Screen name="Feed" component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen name="EventDetails" component={EventDetails} options={{/*{headerShown: false}*/}} />
        </Stack.Navigator>
    )
}