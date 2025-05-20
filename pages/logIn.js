import react from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";
import Input from "../components/Inputs";
import { LinearGradient } from 'expo-linear-gradient';

export default function LogIn ({navigation}){
    return (
          <View style={styles.container}>
            <LinearGradient
                colors={[ '#C36CFF', '#E1B5FF',  '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            <View style={styles.imgContainer}>
                <Image source={require("../assets/icon.png")} alt="logo" style={styles.img}/>
                <View style={styles.whiteBar}></View>
            </View>
            
            <View style={styles.inputContainer}>
                <Input 
                labelTitle={"E-mail :"}
                value={undefined}
                onChangeText={null}
                keyboardType={"email-adress"}
                />
                
                <Input 
                labelTitle={"Senha :"}
                value={undefined}
                onChangeText={null}
                keyboardType={"password-adress"}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ForYou")}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imgContainer: {
        width: "100%",
        height: 200,
        display: "flex",
        alignItems: "center",

    },
    whiteBar: {
        width: "80%",
        height: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    img: {
        width: "75%",
        height: "75%",
        resizeMode: "center",
    },
    inputContainer: {
        width: "100%",
        height: "40vh",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "80%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D9A3FF",
        borderRadius: 25,
        marginTop: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
})