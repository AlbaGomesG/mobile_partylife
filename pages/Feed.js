
import { View, Text, StyleSheet, Image, ScrollView} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Feed({navigation}) {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    getAllUsers = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/users`)
            setUsers(response.data);
        } catch (error) {
            console.error("Error ao retornar os usuários:", error);
        }
    }

    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/posts`)
            setPosts(response.data);
        } catch (error) {
            console.error("Error ao retornar os posts:", error);
        }
    }

        useEffect(() => {
        getAllPosts();
        getAllUsers();
    }, []);

    const getUsernameById = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.username : "usuário desconhecido";
    }


    return (
        <ScrollView style={styles.main} contentContainerStyle={styles.scrollContent}>
            <View style={styles.banner}>
                <Image 
                    source={require('../assets/festa.jpg')} 
                    style={styles.bannerImage}
                />
                <Text style={styles.bannerDescription}>Feed</Text>
            </View>
        <View>
            <View>
                {posts.map((post, index, event) => (
                    <View key={index} style={styles.postContainer}>
                        <Text>{getUsernameById(post.user_id)}</Text> 
                        <Image 
                        source={
                        post.image_post
                            ? post.image_post.startsWith('http')
                            ? { uri: post.image_post }
                            : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${post.image_post}` }
                            : require('../assets/150.svg')
                        }
                        style={styles.postImage} 
                        resizeMode="cover"
                        />
                        <View style={styles.detailContainer}>
                            <Text style={styles.TextContent}>{post.content}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
        </ScrollView>
);
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    banner: {
        marginTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        maxHeight: 200,
    },
    bannerImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    bannerDescription: {
        color: 'white',
        fontSize: 30,
        textShadowColor: '#000',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    postImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 8,
        backgroundColor: '#eee',
    },
    postContainer: {
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#C36CFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    detailContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TextContent: {
        fontSize: 16,
        color: '#000',
        flex: 1,
        marginRight: 32,
        
    },
});