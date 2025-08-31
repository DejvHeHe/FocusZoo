import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Header from '../components/header';
import { useStars } from '../context/StarsContext';
import UnlockableAnimal from '../components/unlockableAnimal';
import { loadLockedAnimals } from '../functions/storage/lockedAnimals';

export default function UnlockAnimalsPage()
{
    const [animals,setAnimals]=useState([])
    const { stars, setStars } = useStars();
    const loadAnimals = async () => {
        try {
          const data = await loadLockedAnimals();
          setAnimals(data);
        } catch (e) {
          console.error("Failed to load unlocked animals:", e);
        }
    };
    useEffect(() => {
      loadAnimals()
      
      
      loadAnimals();
    }, []);

    return(

       <View style={styles.container}>
             <View style={styles.headerContainer}>
               <Header />
             </View>
             <Text style={styles.text}>UNLOCK YOUR NEW ANIMAL</Text>
             <ScrollView 
               style={styles.content}
               showsVerticalScrollIndicator={false} // ✅ vertical scroll
             >
                <View style={styles.grid}>
                          {Array.isArray(animals) && animals.map((animal, index) => (
                            <UnlockableAnimal
                              key={index}
                              photo={animal.photo}
                              type={animal.type}
                              cost={animal.cost_to_unlock}
                              id={animal.id}
                              animal={animal}
                              loadAnimals={loadAnimals}
                              
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
    backgroundColor: '#E8F5E9',
    width: '100%',
  },
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    marginTop: 15,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',             // ✅ umožní více řádků
    justifyContent: 'space-between', // ✅ rovnoměrně rozdělí do řádku
  },
});