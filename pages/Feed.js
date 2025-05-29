import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/posts`)
            setPosts(response.data);
            //console.log("Posts retornados com sucesso:", response.data);
        } catch (error) {
            console.error("Error ao retornar os posts:", error);
            
        }
    }
        useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <ScrollView style={styles.main} contentContainerStyle={styles.scrollContent}>
        <View>
            <View>
                {posts.map((post, index) => (
                    <View key={index} style={styles.postContainer}>
                        <Text>{post.user_id}</Text> {/* será substituido pelo user_name */}
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
                            <TouchableOpacity style={styles.buttonDetails}> {/*onPress={() => navigation.navigate('PostDetails', { postId: post.id })} */} {/* navegação para a página de detalhe do post*/}
                                <Text style={{ color: '#fff'}}>Ver detalhes</Text>
                            </TouchableOpacity>
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
    button: {
        backgroundColor: '#C36CFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
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
    buttonDetails: {
        backgroundColor: '#8077FF',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
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