import react from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Button ({buttonTitle, style}){
    return(
        <View>
            <TouchableOpacity styles={style}>
                <Text>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        </View>
    )
}