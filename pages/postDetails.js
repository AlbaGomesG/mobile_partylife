import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView} from "react-native";
import axios from "axios";
import { useState, useEffect, use } from "react";

export default function PostDetails() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    getAllPosts = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/posts`)
            setPosts(response.data);
        } catch (error) {
            console.error("Error ao retornar os posts:", error);
        }
    }

    const getPostById = async (userId) => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/posts/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error ao retornar o post:", error);
        }
    }

    useEffect(() => {
        getPostById(posts.user_id);
    }, []);

    return(
        <ScrollView style={styles.container}>
            { posts.find((post, index) => (
                <Image 
                key={index}
                    source={
                        post.image_post
                                ? { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${post.image_post}` }
                            : require('../assets/150.svg')
                    }
                    style={styles.postImage}
                    resizeMode="cover"
                />    
            ))}
            <View style={styles.main}>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        width: '100vw',
        height: '100vh',
    },
    postContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    postImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
 })