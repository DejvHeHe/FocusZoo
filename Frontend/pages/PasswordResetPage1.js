import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { generatePasswordResetCode } from '../functions/API';
import Toast from 'react-native-toast-message';

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const onSendReset = async() => {
    const data={email:email}
    console.log("Send reset link to:", email);
    const result=await generatePasswordResetCode(data)
    if(result.error)
    {
      Toast.show({
        type:"error",
        text1:result.message,
        position:"top",    
      }) 

    }
    else{
      navigation.navigate("PasswordReset2", { email: email });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Reset Your Password</Text>
        <Text style={styles.instructionText}>
          Forgot your password? Don’t worry! Enter the email address associated with your account, and we’ll send you a code to create a new password.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
        />

        <Pressable style={styles.buttonPrimary} onPress={onSendReset}>
          <Text style={styles.buttonText}>Send Verification Email</Text>
        </Pressable>

        <Pressable style={styles.backToLogin} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back to Login</Text>
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
  buttonPrimary: {
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
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
