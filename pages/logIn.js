import react from "react";
import { View, StyleSheet, Image } from "react-native";
import Input from "../components/Inputs";
import Button from "../components/Button";

export default function logIn (){
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require("../assets/3.png")} alt="logo" style={styles.img}/>
            </View>
            <View style={styles.inputContainer}>
                <Input 
                labelTitle={"E-mail :"}
                placeholder={"E-mail"}
                value={undefined}
                onChangeText={null}
                keyboardType={"email-adress"}
/>
                
                <Input labelTitle={"Senha :"}
                placeholder={"Senha"}
                value={undefined}
                onChangeText={null}
                keyboardType={"password-adress"}
                />
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

})