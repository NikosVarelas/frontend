import React, { useState } from 'react';
import { Text, View, TextInput, ActivityIndicator, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import CustomButton from '@/components/CustomButton';  // Make sure this path is correct
import { useSession } from '@/context/ctx';
import { router } from 'expo-router';

export default function SignIn() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      await signIn(username, password); 

      setUsername('');
      setPassword('');
      setErrorMessage('');

      router.replace('/(app)')
    } catch (error) {
      if (error.message == String) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An error occured")
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={require("../assets/images/favicon.png")}/>
      {errorMessage.trim() !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setUsername(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={() => handleSignIn(username, password)}>
        <Text>LOGIN</Text>
      </TouchableOpacity>

    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#90EE90",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#006400",
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
  },
});
