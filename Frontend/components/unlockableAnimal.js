// unlockableAnimal.js
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getAnimalImage } from '../functions/imageMap';
import { Feather } from '@expo/vector-icons';
import { saveUnlockedAnimals } from '../functions/storage/unlockedAnimals';
import { saveLockedAnimals } from '../functions/storage/lockedAnimals';
import { useStars } from '../context/StarsContext';
import Toast from 'react-native-toast-message';

export default function UnlockableAnimal({ cost, type, photo,id, animal}) {
  const { stars, setStars } = useStars();
  const onUnlock = async () => {
    if (stars >= cost) {
      try {
        await saveLockedAnimals(id);
        await saveUnlockedAnimals(animal);
        setStars(prev => prev - cost); // ✅ deduct stars

        Toast.show({
          type: 'success',
          text1: `${type} unlocked!`,
          position: 'top',
        });
      } catch (e) {
        console.error('Error unlocking animal:', e);
      }
    } else {
      Toast.show({
        type: 'warning',
        text1: 'You don’t have enough stars',
        position: 'top',
      });
    }
  };
  return (
    <Pressable style={styles.card} onPress={onUnlock}>
      {/* Animal image */}
      <Image source={getAnimalImage("dog")} style={styles.image} />

      {/* Type */}
      <Text style={styles.text}>{type}</Text>

      {/* Cost */}
      <View style={styles.costContainer}>
        <Feather name="star" size={16} color="#FFD700" />
        <Text style={styles.costText}>{cost}</Text>
      </View>
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
});
