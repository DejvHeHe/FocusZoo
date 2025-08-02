import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

// Ručně vytvořená mapa názvů → require()
const imageMap = {
  cat: require('../assets/all_animals_photo/cat.jpg'),
  dog: require('../assets/all_animals_photo/dog.jpg'),
};

export default function AnimalPick({ name, photo, time, cost,onClose, animalSet,animal}) {
  const [isDisabled, setDisable] = useState(false);

  useEffect(() => {
    
    setDisable(time < cost);
  }, [time, cost]);

  function PickAnimal() {
    onClose()
    animalSet()
    
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
        source={imageMap[photo]}
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
