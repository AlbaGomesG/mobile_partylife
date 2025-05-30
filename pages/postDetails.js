import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


function parseJwt(token) {
try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
    atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
} catch {
    return null;
}
}

export default function PostDetails({ route }) {
    const [post, setPost] = useState(null);
    const [event, setEvent] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const payload = parseJwt(token);
                    if (!payload?.id) return console.error('ID do usuário não encontrado no token');
                const postResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/posts/${payload.id}`,{
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPost(postResponse.data);
                console.log("Post:", postResponse.data);

                if (postResponse.data?.id_event) {
                    const eventResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/events/${postResponse.data.id_event}`);
                    setEvent(eventResponse.data);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {event && (
                <Image
                    source={
                        event.event_photo
                            ? { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${event.event_photo}` }
                            : require('../assets/150.svg')
                    }
                    style={styles.postImage}
                    resizeMode="cover"
                />
            )}
            <View style={styles.main}>
                
                <Text>{event?.event_name}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    postImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    main: {
        // Adicione estilos conforme necessário
    }
});