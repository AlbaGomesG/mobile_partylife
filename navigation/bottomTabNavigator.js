import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import PostDetails from "../pages/postDetails";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 8,
                    backgroundColor: "#C36CFF",
                    height: 70,
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOpacity: 0.15,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 10,
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#f3e6ff",
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 8,
                },
                tabBarIconStyle: {
                    marginTop: 8,
                },
            }}
        >
            <Tab.Screen 
                name="Feed" 
                component={Feed} 
                options={{ 
                    tabBarLabel: "Feed",
                    tabBarIcon: ({ color, size }) => (                  
                        <MaterialIcons name="dynamic-feed" size={size} color={color} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{ 
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }} 
            />

        </Tab.Navigator>
    );
}

