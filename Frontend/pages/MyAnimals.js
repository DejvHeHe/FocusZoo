import React, { useState, useEffect } from 'react';
import { ScrollView, View,Text, StyleSheet} from 'react-native';
import Animal from '../components/myAnimal';
import { loadData } from '../functions/storage/loadMyAnimals';

export default function MyAnimals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const loadedAnimals = await loadData('animals');
      if (loadedAnimals) {
        setAnimals(loadedAnimals);
      }
    };
    fetchAnimals();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.text}>MY ANIMALS</Text>
        <ScrollView style={styles.content}>
        
            {animals.map((animal, index) => (
                <Animal
                key={index}
                name={animal.name}
                photo={animal.photo}
                />
            ))}
    </ScrollView>
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    margin: 10,
    flex: 1,
    backgroundColor: '#E8F5E9',
    width: '100%',
  
    },
    text:{
        marginTop:'10%',
        
    }
});

