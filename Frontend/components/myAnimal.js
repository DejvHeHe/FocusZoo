import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getAnimalImage } from '../functions/imageMap';

export default function Animal({name,photo})
{
    return (
        <Pressable>
          <Image
            source={getAnimalImage(photo)}
            style={styles.image}
           
          />
          <Text style={styles.tetx}>{name}</Text>
        </Pressable>
      );
}
const styles = StyleSheet.create({
  
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    
  },
});