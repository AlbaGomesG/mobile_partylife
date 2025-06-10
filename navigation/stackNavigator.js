import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from "./bottomTabNavigator";
import Ionicons from '@expo/vector-icons/Ionicons';
import LogIn from '../pages/logIn';
import EventDetails from "../pages/EventsDetails";
import Loading from "../pages/Loading";

const Stack = createNativeStackNavigator();

function AuthOrApp({ navigation }) {
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.reset({ index: 0, routes: [{ name: 'Feed' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'LogIn' }] });
      }
    };
    checkToken();
  }, []);

  return <Loading />;
}

export default function StackNavigator() {
  return(
    <Stack.Navigator initialRouteName="AuthOrApp">
      <Stack.Screen name="AuthOrApp" component={AuthOrApp} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="Feed" component={BottomTabNavigator} options={{ headerShown: false }} />
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