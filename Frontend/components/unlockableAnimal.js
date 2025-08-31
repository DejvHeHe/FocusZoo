// unlockableAnimal.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getAnimalImage } from '../functions/imageMap';
import { Feather } from '@expo/vector-icons';
import { saveUnlockedAnimals } from '../functions/storage/unlockedAnimals';
import { saveLockedAnimals } from '../functions/storage/lockedAnimals';
import { useStars } from '../context/StarsContext';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';

export default function UnlockableAnimal({ cost, type, photo, id, animal, loadAnimals }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { stars, setStars } = useStars();

  const toggleModal = () => setModalVisible(!isModalVisible);

  const onUnlock = async () => {
    if (stars >= cost) {
      try {
        await saveLockedAnimals(id);
        await saveUnlockedAnimals(animal);
        setStars(prev => prev - cost); // ✅ odečti hvězdičky
        await loadAnimals();

        Toast.show({
          type: 'success',
          text1: `${type} unlocked!`,
          position: 'top',
        });
        toggleModal();
      } catch (e) {
        console.error('Error unlocking animal:', e);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'You don’t have enough stars',
        position: 'top',
      });
    }
  };

  return (
    <Pressable style={styles.card} onPress={toggleModal}>
      {/* Animal image */}
      <Image source={getAnimalImage("dog")} style={styles.image} />

      {/* Type */}
      <Text style={styles.text}>{type}</Text>

      {/* Cost */}
      <View style={styles.costContainer}>
        <Feather name="star" size={16} color="#FFD700" />
        <Text style={styles.costText}>{cost}</Text>
      </View>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to unlock this animal?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable style={[styles.modalButton, styles.yesButton]} onPress={onUnlock}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </Pressable>
            <Pressable style={[styles.modalButton, styles.noButton]} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Pressable>
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
    textAlign: 'center',
    marginBottom: 4,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  costText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    color: '#555',
  },

  // 🔽 modal styles
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0, // full screen
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#4CAF50',
  },
  noButton: {
    backgroundColor: '#E53935',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
