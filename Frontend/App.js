import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modal';

export default function App() {
  const [minutes, setMinutes] = useState(30);
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => setModalVisible(!isModalVisible);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>TVŮJ TIMER:</Text>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
        {minutes} minut
      </Text>
      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={1}
        maximumValue={120}
        step={1}
        value={minutes}
        minimumTrackTintColor="#66BB6A"
        maximumTrackTintColor="#C8E6C9"
        thumbTintColor="#388E3C"
        onValueChange={setMinutes}
      />
      <Pressable  style={styles.buttonSecondary} onPress={toggleModal}>
        <Text style={styles.buttonText}>CHOOSE ANIMAL</Text>
      </Pressable>      
      <Pressable style={styles.buttonPrimary} onPress={() => alert(`Startuji timer na ${minutes} minut`)}>
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        style={styles.modal}
      >

        <View style={styles.modalContent}>

        </View>
      </Modal>


      <StatusBar style="auto" />
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
  buttonPrimary: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width:200,
    
  },
  buttonSecondary: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width:200,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign:'center'
  },
  modal: {
  justifyContent: 'flex-end',
  margin: 0,
},
  modalContent:{
    backgroundColor:'#4FC3F7',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
    
  },
});
