import { createNativeStackNavigator } from "@react-navigation/native-stack";
import logIn from "../pages/logIn";
import forYou from "../pages/forYou";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator >
            <Stack.Screen name="logIn" component={logIn} />
            <Stack.Screen name="Home" component={forYou} />
        </Stack.Navigator>
    )
}