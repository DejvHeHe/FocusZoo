import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../functions/API';

export default function LoginPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigation = useNavigation();
  const [email,setEmail]=useState("");  
  const[password,setPassword]=useState("");

  const onLogin = async() =>
  {
    const data={
      email:email,
      password:password
    }
    await login(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 30 }}>Log in</Text>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder='Password'
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

        <Pressable style={styles.buttonPrimary} >
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Create account</Text>
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
  },
  headerContainer: {
    paddingTop: 100,
    margin: 40
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    margin: 30,
    gap: 30,
    borderWidth: 2,
    borderColor: '#388E3C',
    borderRadius: 12,
    padding: 20,
    backgroundColor: 'white',
    width: "90%",
    
  },
  input: {
    borderWidth: 2,
    borderColor: '#388E3C',
    borderRadius: 12,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#388E3C',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '95%',
  },
  buttonSecondary: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '95%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 70,
    width: '100%',
    alignItems: "center",
  },
});
