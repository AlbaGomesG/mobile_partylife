import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PostDetails({ route }) {
    const [post, setPost] = useState(null);
    const [event, setEvent] = useState(null);
    
    const postId = route?.params?.postId || 1; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/posts/${postId}`);
                setPost(postResponse.data);

                if (postResponse.data?.id_event) {
                    const eventResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/events/${postResponse.data.id_event}`);
                    setEvent(eventResponse.data);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, [postId]);

    return (
        <ScrollView style={styles.container}>
            {event && (
                <Image
                    source={
                        event.event_photo
                            ? { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${event.event_photo}` }
                            : require('../assets/150.png')
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