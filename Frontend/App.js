import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import IntroPage2 from './pages/IntroPage2';
import LoginPage from './pages/LoginPage';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroPage} />
        <Stack.Screen name="Intro2" component={IntroPage2} />
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="Main" component={MainPage} />
      </Stack.Navigator>
      <Toast />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
