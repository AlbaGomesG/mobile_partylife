import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import BottomTabNavigator from "./bottomTabNavigator";
import Ionicons from '@expo/vector-icons/Ionicons';
import LogIn from '../pages/logIn';

import Feed from "../pages/Feed";
import EventDetails from "../pages/EventsDetails";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
            <Stack.Screen name="Feed" component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen 
                name="EventDetails" 
                component={EventDetails} 
                options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: "", 
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: "transparent", 
                            elevation: 0, 
                            shadowOpacity: 0,   
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                                <Ionicons name="arrow-back" size={28} color="black" />
                            </TouchableOpacity>
                        ),
                    })}
            />
        </Stack.Navigator>
    )
}