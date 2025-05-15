import react from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";
import Input from "../components/Inputs";


export default function LogIn (){
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require("../assets/icon.png")} alt="logo" style={styles.img}/>
            </View>
            <View style={styles.inputContainer}>
                <Input 
                labelTitle={"E-mail :"}
                placeholder={"E-mail"}
                value={undefined}
                onChangeText={null}
                keyboardType={"email-adress"}
                />
                
                <Input 
                labelTitle={"Senha :"}
                placeholder={"Senha"}
                value={undefined}
                onChangeText={null}
                keyboardType={"password-adress"}
                />
                <TouchableOpacity style={styles.button} >
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C36CFF",
    },
    imgContainer: {
        width: "60%",
        height: "30vh",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    inputContainer: {
        width: "100%",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "80%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7B2FF2",
        borderRadius: 25,
        marginTop: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

})