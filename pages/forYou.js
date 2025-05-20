import react from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ForYou(){
    return(
        <View style={styles.container}>
            <Text>
                voce está na Tela For You
            </Text>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFF",
        width: "100vw",
        height: "100vh"
    }
})