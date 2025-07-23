import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import MainPage from './pages/MainPage';
import Toast from 'react-native-toast-message';
import IntroPage from './pages/IntroPage';


export default function App() {
  
  return (
    <View style={styles.container}>
        <IntroPage/>
      
      <Toast />
      
    </View>
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
