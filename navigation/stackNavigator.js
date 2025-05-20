import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from '../pages/logIn';
import ForYou from '../pages/forYou';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />

            <Stack.Screen name="ForYou" component={ForYou} options={{
                title: "Home",
                headerTitleAlign: "center",
                headerTintColor: "#FFFF",
                headerStyle:{
                    backgroundColor: "#C36CFF",
                },
                
            }}/>

        </Stack.Navigator>
    )
}