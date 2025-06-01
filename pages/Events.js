import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/events`);
                setEvents(response.data);
                console.log("Eventos:", response.data);
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
                <TouchableOpacity key={event.id} onPress={() => navigateToEventDetails(event.id)}>
                <View style={styles.eventContainer}>
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
                </View>
                </TouchableOpacity>
            ))}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Eventos</Text>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 16,
    },
    eventContainer: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    eventImage: {
        width: '100%',
        height: 200,
    },
    eventDescription: {
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});