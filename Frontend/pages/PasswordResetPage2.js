// PasswordResetPage2
import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { resetPassword } from '../functions/API';

export default function PasswordResetPage2() {
  const navigation = useNavigation();
  const [newpassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [checkFailed, setCheckFailed] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const route = useRoute();
  const { email } = route.params;

  const onVerifyReset = async () => {
    if (newpassword !== newPasswordAgain) {
      Toast.show({
        type: 'error',
        text1: "Passwords don't match",
        position: 'top',
      });
      setCheckFailed(true);
      return;
    }
    setCheckFailed(false);

    const data = {
      email: email,      
      newPassword: newpassword,
      resetCode: resetCode,
    };

    
    const result = await resetPassword(data);
    if(result.error)
    {
        Toast.show({
            type:"error",
            text1:result.message,
            position:"top",    
        }) 

    }
    Toast.show({
            type:"info",
            text1:"You passwor was reseted",
            position:"top",    
        }) 

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Reset Your Password</Text>
        <Text style={styles.instructionText}>
          Enter your verification code, and your new password
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Verification Code */}
        <TextInput
          style={styles.input}
          placeholder="Verification code"
          value={resetCode}
          onChange={e => setResetCode(e.nativeEvent.text)}
        />

        {/* New Password */}
        <View style={checkFailed ? styles.passwordInputContainerFailed : styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!passwordVisibility}
            value={newpassword}
            onChange={e => setNewPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color="#388E3C"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={checkFailed ? styles.passwordInputContainerFailed : styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password again"
            secureTextEntry={!passwordVisibility}
            value={newPasswordAgain}
            onChange={e => setNewPasswordAgain(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color="#388E3C"
            />
          </TouchableOpacity>
        </View>

        <Pressable style={styles.buttonPrimary} onPress={onVerifyReset}>
          <Text style={styles.buttonText}>Confirm Reset</Text>
        </Pressable>

        <TouchableOpacity style={styles.backToLogin} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  contentContainer: {
    width: "100%",
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
    width: "100%",
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
    fontWeight: "600",
  },
  backToLogin: {
    marginTop: 15,
  },
  backText: {
    color: '#388E3C',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
