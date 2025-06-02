import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
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
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.postImageContainer}>
                    <Image 
                        source={
                            EventDetails.image_event
                                ? EventDetails.image_event.startsWith('http')
                                    ? { uri: EventDetails.image_event }
                                    : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${EventDetails.image_event}` }
                                : require('../assets/150.svg')
                        }
                        style={styles.postImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.partyName}>{EventDetails.title}</Text>
                    <Text style={styles.partySubtitle}><EvilIcons name="location" size={24} color="white" />{EventDetails.local}</Text>
                </View>
                <View style={styles.postContainerPink}>
                    <View style={{ width: '70%'}}>
                        <Text style={styles.partyDescription}>{EventDetails.description}</Text>
                    </View>
                </View>
                <View style={styles.postContainer}>
                    <View style={{ width: '70%'}}>
                    <Text style={styles.textRegras}>Regras</Text>
                    <Text style={styles.partyDescription}>{EventDetails.events_rules}</Text>
                    </View>
                </View>
                <View style={styles.postContainerPink}>
                    <View style={{ width: '70%'}}>
                    <Text style={styles.partyItens}>O que terá na festa?</Text>
                    <Text style={styles.partyDescription}>{EventDetails.party_itens}</Text>
                    </View>
                </View>
                <View style={styles.postContainer}>
                    <View style={{ width: '70%'}}>
                    <Text style={styles.partyItens}>O que levar para a festa?</Text>
                    <Text style={styles.partyDescription}>{EventDetails.take_products}</Text>
                    </View>
                    </View>
                </View>
                <View style={styles.postContainerHashtags}>
                    <View style={{ width: '70%'}}>
                    <Text style={styles.partyHashtags}>Hashtags oficiais</Text>
                    <Text style={styles.partyDescription}>{EventDetails.hashtags}</Text>
                    </View>
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    postImage: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: 0,
    },
    postImageContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        justifyContent: 'center',
    },
    postContainerPink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 270,
        backgroundColor: '#E1B5FF',
    },
    postContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 300,
        justifyContent: 'center',
    },
    partyName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        width: '45%',
        marginLeft: 20,
    },
    partySubtitle: {
        fontSize: 16,
        color: 'white',
        width: '50%',
        marginLeft: 20,
    },
    partyDescription: {
        fontSize: 15,
        color: 'black',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'justify',
        width: '90%',
        fontWeight: 'bold',
    },
    textRegras: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '90%',
        color: '#C80000',
    },
    partyItens: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        width: '90%',
        color: '#006221',
    },
    postContainerHashtags: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        backgroundColor: '#E1B5FF',
    },
    partyHashtags: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        width: '90%',
        color: '#000000',
    },
});