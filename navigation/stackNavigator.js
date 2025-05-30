import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./bottomTabNavigator";
import LogIn from '../pages/logIn';
import Profile from '../pages/Profile';
import Feed from "../pages/Feed";
import PostDetails from "../pages/postDetails";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
            <Stack.Screen name="Feed" component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen name="PostDetails" component={PostDetails} options={{/*{headerShown: false}*/}} />
        </Stack.Navigator>
    )
}