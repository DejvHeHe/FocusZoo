import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable,TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { getAnimalImage } from '../functions/imageMap';


export default function Animal({ name, photo }) {
  const[isModalVisible,setModalVisible]=useState(false)
  const toggleModal = () => setModalVisible(!isModalVisible);
  
  return (
  <>
    <Pressable style={styles.card} onPress={toggleModal}>
      <Image
        source={getAnimalImage(photo)}
        style={styles.image}
      />
      <Text style={styles.text}>{name}</Text>
    </Pressable>

    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      swipeDirection="down"
      style={styles.modal}
    >
       <View style={styles.modalContent}>
          <TextInput
              placeholder={name}
          />
          <Image

          />
          <Text>Date of aquire:</Text>
          <Text>Type:</Text>
        </View>
    </Modal>
  </>
);

  
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#4CAF50', // zelený rámeček (můžeš změnit barvu)
    borderRadius: 12,
    padding: 10,
    marginRight: 10, // mezera mezi kartičkami
    alignItems: 'center',
    backgroundColor: '#fff', // bílý podklad
    shadowColor: '#000', // malý stín pro zvýraznění
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android stín
    width: '30%',   // 3 do řádku + mezery
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#4FC3F7',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
