import react from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

export default function Input ({labelTitle, placeholder, value, onChangeText, keyboardType, secureTextEntry}){
    return(
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{labelTitle}</Text>
            <TextInput 
            style={styles.input}
            placeholder={placeholder}
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
        width: "60%",
    },
    label: {
        fontSize: 15,
        color: "#fff",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 25,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
})