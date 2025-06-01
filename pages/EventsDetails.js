import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function PostDetails() {
    const [EventDetails, setEventDetails] = useState([]);
    const route = useRoute();
    const {id} = route.params;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/events/${id}`);
                if (!response.data) {
                    throw new Error('Nenhum dado encontrado para o ID fornecido');
                }
                setEventDetails(response.data);
                console.log("Detalhes do Evento:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            
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