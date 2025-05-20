import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from '../pages/logIn';
import ForYou from '../pages/forYou';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator >
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
            <Stack.Screen name="Home" component={ForYou} />
        </Stack.Navigator>
    )
}