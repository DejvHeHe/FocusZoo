import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getAnimalImage } from '../functions/imageMap';

export default function AnimalPick({ name, photo, time, cost, onClose, animalSet, animal }) {
  const [isDisabled, setDisable] = useState(false);

  useEffect(() => {
    setDisable(time < cost);
  }, [time, cost]);

  function PickAnimal() {
    onClose();
    animalSet();
  }

  return (
    <Pressable
      style={[
        styles.container,
        isDisabled && { opacity: 0.4 } // optické zneaktivnění
      ]}
      onPress={PickAnimal}
      disabled={isDisabled}
    >
      <Image
        source={getAnimalImage(photo)}   
        style={styles.image}
      />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});
