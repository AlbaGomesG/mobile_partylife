import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import Input from "../components/Inputs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.88.199.149:3030/api/auth/login', {
        email,
        senha: password,
      });

      const { token } = response.data;

      if (!token) {
        throw new Error('Token não encontrado na resposta');
      }

      await AsyncStorage.setItem('token', token);

      setError(null);
      setSuccess('Login realizado com sucesso!');

      navigation.navigate('Feed');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);
      setSuccess(null);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#C36CFF', '#E1B5FF', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <View style={styles.imgContainer}>
        <Image source={require("../assets/icon.png")} alt="logo" style={styles.img} />
        <View style={styles.whiteBar}></View>
      </View>

      <View style={styles.inputContainer}>
        <Input
          labelTitle={"E-mail :"}
          value={email}
          onChangeText={setEmail}
          keyboardType={"email-address"}
        />

        <Input
          labelTitle={"Senha :"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  imgContainer: { width: "100%", height: 200, alignItems: "center" },
  whiteBar: {
    width: "80%",
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  img: { width: "75%", height: "75%", resizeMode: "center" },
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
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  error: { color: "red", marginTop: 10 },
  success: { color: "green", marginTop: 10 },
});
