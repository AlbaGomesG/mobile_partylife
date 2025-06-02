import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/events`);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    },[]);

    const navigation = useNavigation();

    const navigateToEventDetails = (id) => {
        navigation.navigate('EventDetails', {id});
    }
    return (

            <ScrollView style={styles.main} contentContainerStyle={styles.scrollContent}>
            
            {events.map((event) => (
                <TouchableOpacity key={event.id} onPress={() => navigateToEventDetails(event.id)} style={styles.mainContainer}>
                    <LinearGradient
                        style={styles.backgroundColor}
                        colors={['#C36CFF', '#E1B5FF', '#FFFFFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Image 
                        source={
                            event.image_event
                                ? event.image_event.startsWith('http')
                                    ? { uri: event.image_event }
                                    : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${event.event_photo}` }
                                : require('../assets/150.svg')
                        }
                        style={styles.eventImage}
                        resizeMode="cover"
                    />
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },

    backgroundColor: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        padding: 16,
    },

    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: 'white',
    },

    eventImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },

    eventDescription: {
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});