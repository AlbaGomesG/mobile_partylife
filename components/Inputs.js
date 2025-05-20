import react from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

export default function Input ({labelTitle, placeholder, value, onChangeText, keyboardType, secureTextEntry}){
    return(
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{labelTitle}</Text>
            <TextInput 
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}>
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        width: "70%",
    },
    label: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        color: "#7B2FF2",
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        outlineStyle: "none",
    },
})