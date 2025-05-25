import { View, TouchableOpacity, Text, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Feed() {
    const navigation = useNavigation();

    const handleProfile = async () => {
        navigation.navigate('Profile');
    }

  return (
    <View>
        <TouchableOpacity onPress={handleProfile} style={styles.button}>
            <Text>Ir para profile</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#C36CFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
});