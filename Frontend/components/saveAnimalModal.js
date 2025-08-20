import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import {saveData} from '../functions/storage/saveAnimals';
import { loadData } from '../functions/storage/loadMyAnimals';

export default function SaveAnimalModal({ onClose, isAnimalSaveVisible, animalPicked }) {
  const [animalName, setAnimalName] = useState('');
  async function handleSave()
  {
    const loadedData=await loadData('animals')
    const today=new Date();
    const data={
      type:animalPicked.type,
      photo:animalPicked.photo,
      name:animalName,
      date:today


    }
    loadedData.push(data)
    await saveData('animals',loadedData)
    onClose()

  }

  

  return (
    <Modal 
      isVisible={isAnimalSaveVisible}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.contentContainer}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Name your new animal</Text>
        <TextInput 
          style={styles.input} 
          value={animalName} 
          onChangeText={setAnimalName} 
          placeholder="Enter name" 
        />
        <Pressable style={styles.buttonPrimary} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',  // Center vertically
    alignItems: 'center',      // Center horizontally
    margin: 0,                 // Remove default margin to center properly
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#388E3C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#388E3C',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  buttonPrimary: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
