import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { register, login } from '../functions/API';
import Toast from 'react-native-toast-message';

export default function RegisterPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState(""); 
  const [registerFailed, setRegisterFailed] = useState(false);

  const onRegister = async () => { 
    if(password !== passwordAgain) {
      Toast.show({
        type: 'error',
        text1: "Passwords don't match",
        position: 'top',
      });
      setRegisterFailed(true);
      return;
    }

    setRegisterFailed(false);
    const data = { email, password };
    await register(data);
    await login(data);
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
        />

        <View style={registerFailed ? styles.passwordInputContainerFailed : styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!passwordVisibility}
            value={password}
            onChange={e => setPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color="#388E3C"
            />
          </TouchableOpacity>
        </View>

        <View style={registerFailed ? styles.passwordInputContainerFailed : styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password again"
            secureTextEntry={!passwordVisibility}
            value={passwordAgain}
            onChange={e => setPasswordAgain(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color="#388E3C"
            />
          </TouchableOpacity>
        </View>

        <Pressable style={styles.buttonPrimary} onPress={onRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  headerContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#388E3C',
    borderRadius: 12,
    padding: 20,
    gap: 15,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#388E3C',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#388E3C',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  passwordInputContainerFailed: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fc0317',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
