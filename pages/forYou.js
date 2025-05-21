import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function ForYou(){
    const [name, setName] = useState([]);
    const [userName, setUserName] = useState([]);

        useEffect(() => {
        getUserData();
    }, []);             

    const getUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado');
            }
            const userId = 1;
            const response = await axios.get(`http://192.168.1.6:3030/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setName(response.data.name);
            setUserName(response.data.username);
            console.log('Dados do usuário:', response.data);
        } catch (error) {
            throw new Error('Erro ao buscar dados do usuário');
        }
    }


    return(
        <View style={styles.main}>
            <View style={styles.profileContainer}>
                    <Image source={require("../assets/150.svg")} style={styles.img} />
                    <View>
                        <Text style={styles.Name}>Olá, {name}</Text>
                        <Text style={styles.userName}>{userName}</Text>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#FFFF",
        width: "100vw",
        height: "100vh"
    },
    profileContainer: {
        display: "flex",
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
        marginRight: 20
    },
})