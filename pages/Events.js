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
                        start={{ x: 0, y: 2 }}
                        end={{ x: 2, y: 0 }}
                    >
                        <Text style={styles.eventTitle}>{event.title}</Text>
                    </LinearGradient>
                    <View style={styles.eventImageCase}>
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
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        color: '#333',
    },

    backgroundColor: {
        width: '100%',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    scrollContent: {
        padding: 16,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#ffff',
    },

    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: 'white',

    },
    eventImageCase: {
        width: '100%',
        height: 200,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
    },
    eventImage: {
        width: '100%',
        height: 200,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    eventDescription: {
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});