import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Ručně vytvořená mapa názvů → require()
const imageMap = {
  cat: require('../assets/all_animals_photo/cat.jpg'),
  dog: require('../assets/all_animals_photo/dog.jpg'),
};

export default function AnimalPick({ name, photo }) {
  return (
    <View style={styles.container}>
      
      <Image
        source={imageMap[photo]} // správně použitá mapa
        style={styles.image}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
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
