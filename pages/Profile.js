import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
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
  const [bio, setBio] = useState('');
  const [posts, setPosts] = useState([]);
  const [perfil_photo, setPerfilPhoto] = useState('');
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
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

      console.log('Dados do usuário:', response.data);

      const user = Array.isArray(response.data) ? response.data[0] : response.data;
      setName(user?.name || '');
      setBio(user?.bio || '');
      setPerfilPhoto(user?.perfil_photo || '');
      setUsername(user?.username || '');
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

  const openModal = () => {
    setEditName(name);
    setEditBio(bio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const payload = parseJwt(token);
      await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/api/users_info/${payload.id}`,
        { name: editName, bio: editBio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName(editName);
      setBio(editBio);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  return (
    <ScrollView style={styles.main} contentContainerStyle={styles.scrollContent}>
      <View style={styles.menuNameContainer}>
        <Text style={styles.menuName}>Profile:</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={
          perfil_photo
            ? perfil_photo.startsWith('http')
              ? { uri: perfil_photo }
              : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${perfil_photo}` }
            : require('../assets/150.svg')
        } style={styles.img} />
        <View>
          <Text style={styles.Name}>Olá, {name}</Text>
          <Text style={styles.userName}>@{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
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
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar Perfil</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome"
                  value={editName}
                  onChangeText={setEditName}
                />
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  placeholder="Bio"
                  value={editBio}
                  onChangeText={setEditBio}
                  multiline
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  menuNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bio: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
    maxWidth: 180,
  },
  editButton: {
    backgroundColor: "#C36CFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C36CFF",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C36CFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#C36CFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#C36CFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  bio: {
    color: "#888",
    fontStyle: "italic",
    marginTop: 4 
  }
});
