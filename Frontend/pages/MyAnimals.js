import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Animal from '../components/myAnimal';
import { loadData } from '../functions/storage/loadMyAnimals';
import Header from '../components/header';


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
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <Text style={styles.text}>MY ANIMALS</Text>
      <ScrollView 
        style={styles.content}
        horizontal={true}      // 👈 důležité
        showsHorizontalScrollIndicator={false} // volitelné, schová scrollbar
      >
        <View style={styles.row}>
          {Array.isArray(animals) && animals.map((animal, index) => (
            <Animal
              key={index}
              name={animal.name}
              photo={animal.photo}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#E8F5E9',
    width: '100%',
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    marginTop: '10%',
  },
  content: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',  // 👈 vykreslí je vedle sebe
    alignItems: 'center',
  },
});
