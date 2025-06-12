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
                            EventDetails.photo
                                ? EventDetails.photo.startsWith('http')
                                    ? { uri: EventDetails.photo }
                                    : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${EventDetails.photo}` }
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
                    <Text style={styles.textRegras}>REGRAS</Text>
                    <Text style={styles.partyDescription}>{EventDetails.events_rules}</Text>
                    </View>
                </View>
                <View style={styles.postContainerPink}>
                    <View style={{ width: '70%'}}>
                    <Text style={styles.partyItens}>O QUE TERÁ NA FESTA?</Text>
                    <Text style={styles.partyDescription}>{EventDetails.party_itens}</Text>
                    </View>
                </View>
                <View style={styles.postContainer}>
                    <View style={{ width: '70%'}}>
                    <Text style={styles.partyItens}>O QUE LEVAR PARA A FESTA ?</Text>
                    <Text style={styles.partyDescription}>{EventDetails.take_products}</Text>
                    </View>
                    </View>
                </View>
                <View style={styles.postContainerPink}>
                    <View style={{ width: '70%'}}>
                        <Text style={styles.partyItens}>ATRAÇÕES</Text>
                    </View>
                    <View style={styles.attractionImgContainer}>
                        <Image 
                        source={
                            EventDetails.attractions 
                            ? EventDetails.attractions.startsWith('http')
                                ? { uri: EventDetails.attractions }
                                : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${EventDetails.attractions}` }
                            : require('../assets/150.svg')
                        }
                        style={styles.attractionImg}
                        resizeMode="cover"
                        />
                    </View>
                    <Text style={styles.partyDescription}>{EventDetails.attractions_name}</Text>
                </View>
                <View style={styles.postContainer}>
                    <View style={{ width: '70%'}}>
                        <Text style={styles.partyItens}>ESTILO DA FESTA</Text>
                    </View>
                    <View style={styles.styleImgContainer}>
                        <Image
                            source={
                                EventDetails.styles
                                    ? EventDetails.styles.startsWith('http')
                                        ? { uri: EventDetails.styles }
                                        : { uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${EventDetails.styles}` }
                                    : require('../assets/150.svg')
                            }
                            style={styles.styleImg}
                            resizeMode="cover" 
                        />
                    </View>
                    <Text style={styles.partyDescription}>{EventDetails.styles_name}</Text>
                </View>
                <View style={styles.postContainerHashtags}>
                    <View style={{ width: '70%'}}>
                    <Text style={styles.partyHashtags}>HASHTAGS OFICIAIS</Text>
                    <Text style={styles.partyDescriptionHash}>{EventDetails.hashtags}</Text>
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
        height: 300,
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
        textAlign: 'left',
        fontWeight: 'bold',
    },
    partyDescriptionHash: {
        fontSize: 15,
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white'
    },
    textRegras: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#C80000',
    },
    partyItens: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
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
        textAlign: 'center',
    },
    partyHashtags: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: '#000000',
    },
    attractionImgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
    },
    attractionImg: {
        width: '75%',
        height: '75%',
        borderRadius: 10,

    },
    styleImgContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 200,
        justifyContent: 'center',
    }
});