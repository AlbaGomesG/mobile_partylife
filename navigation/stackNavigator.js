import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from '../pages/LogIn';
import ForYou from '../pages/ForYou';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator >
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
            <Stack.Screen name="Home" component={ForYou} />
        </Stack.Navigator>
    )
}