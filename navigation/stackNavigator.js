import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from '../pages/logIn';
import Profile from '../pages/Profile';
import Feed from "../pages/Feed";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
            <Stack.Screen name="Feed" component={Feed} options={{
                title: "Feed",
                headerTitleAlign: "center",
                headerShown: false,
                headerTintColor: "#FFFF",
                headerStyle:{
                    backgroundColor: "#C36CFF",
                },
            }}/>

            <Stack.Screen name="Profile" component={Profile} options={{
                title: "Profile",
                headerTitleAlign: "center",
                headerTintColor: "#FFFF",
                headerStyle:{
                    backgroundColor: "#C36CFF",
                },
            }}/>

        </Stack.Navigator>
    )
}