import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { getAnimalImage } from '../functions/imageMap';
import { Feather } from '@expo/vector-icons';

export default function Animal({ name, photo, date, type }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <>
      <Pressable style={styles.card} onPress={toggleModal}>
        <Image source={getAnimalImage(photo)} style={styles.image} />
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>{name}</Text>
            <Feather name="edit-2" size={18} color="black" style={styles.editIcon} />
          </View>
          <View style={styles.separator} />

          {/* Image */}
          <Image source={getAnimalImage(photo)} style={styles.modalImage} />

          {/* Date */}
          <View style={styles.separator} />
          <Text style={styles.infoText}>Date: {date}</Text>

          {/* Type */}
          <View style={styles.separator} />
          <Text style={styles.infoText}>Animal type: {type}</Text>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '30%',
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
    justifyContent: 'center',
    margin: 20,
  },
  modalContent: {
    backgroundColor: '#4FC3F7',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 6,
  },
  editIcon: {
    marginLeft: 4,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 8,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
