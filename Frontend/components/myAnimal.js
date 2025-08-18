import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getAnimalImage } from '../functions/imageMap';

export default function Animal({ name, photo }) {
  return (
    <Pressable style={styles.card}>
      <Image
        source={getAnimalImage(photo)}
        style={styles.image}
      />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
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
});
