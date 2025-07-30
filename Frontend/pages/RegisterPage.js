import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 30 }}>Sign in</Text>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder='Password'
            secureTextEntry={!passwordVisibility}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color="#388E3C"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder='Password again'
            secureTextEntry={!passwordVisibility}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color="#388E3C"
            />
          </TouchableOpacity>
        </View>

        <Pressable style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Sign in</Text>
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
