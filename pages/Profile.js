import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


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

export default function Profile() {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [posts, setPosts] = useState([]);
    const navigation = useNavigation();

useEffect(() => {
    getUserData();
    getUserPosts();
}, []);

const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return console.error('Token não encontrado');

        const payload = parseJwt(token);
        if (!payload?.id) return console.error('ID do usuário não encontrado no token');

        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/users/${payload.id}`, {
        headers: { Authorization: `Bearer ${token}` }
        });

        setName(response.data.name);
        setUserName(response.data.username);
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
};

const getUserPosts = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return console.error('Token não encontrado');

        const payload = parseJwt(token);
        if (!payload?.id) return console.error('ID do usuário não encontrado no token');

        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/posts/${payload.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setPosts(response.data);
    } catch (error) {
        console.error('Erro ao buscar posts do usuário:', error);
    }
};

const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
        navigation.reset({
            index: 0,
            routes: [{ name: 'LogIn' }],
        });
};

    return (
        <ScrollView style={styles.main} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.menuName}>Profile:</Text>
        <View style={styles.profileContainer}>
            <Image source={require("../assets/150.svg")} style={styles.img} />
            <View>
            <Text style={styles.Name}>Olá, {name}</Text>
            <Text style={styles.userName}>{userName}</Text>
            </View>
        </View>

        <View style={styles.postsContainer}>
            <Text style={styles.postsTitle}>Seus Posts:</Text>
            {posts.length === 0 ? (
            <Text style={styles.noPosts}>Nenhum post encontrado.</Text>
            ) : (
            posts.map((item) => (
                <View style={styles.postItem} key={item.id}>
                <Image
                    source={
                    item.image_post
                        ? item.image_post.startsWith('http')
                        ? { uri: item.image_post }
                        : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${item.image_post}` }
                        : require('../assets/150.svg')
                    }
                    style={styles.postImage}
                    resizeMode="cover"
                />
                <Text style={styles.postContent}>{item.content}</Text>
                </View>
            ))
            )}
        </View>
        <TouchableOpacity style={styles.buttonSair} onPress={handleLogout}>
            <Text style={styles.sair}>Sair</Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFFF",
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  menuName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#C36CFF",
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  Name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    color: "gray",
  },
  buttonSair: {
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9A3FF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sair: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  postsContainer: {
    marginTop: 20,
  },
  postsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noPosts: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  },
  postItem: {
    marginVertical: 10,
  },
  postTitle: {
    fontWeight: 'bold',
  },
  postContent: {
    color: '#444',
    fontSize: 15,
    marginTop: 2,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
});
