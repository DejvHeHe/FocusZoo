import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.container}>
      {/* Ikony vlevo */}
      <View style={styles.icons}>
        <Ionicons name="star" size={24} color="#fbc02d" style={styles.icon} />
        <Image
          source={require('../assets/food-ration.png')}
          style={styles.image}
        />
      </View>

      {/* Option button vpravo */}
      <TouchableOpacity onPress={() => alert('Menu pressed')} style={styles.optionButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    backgroundColor: '#E8F5E9',
    position: 'relative', // potřebné pro absolutní pozicování uvnitř
    justifyContent: 'center',
  },
  icons: {
    position: 'absolute',
    top: 15,    
    right: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    position: 'absolute',
    top: 15,
    left: 1,
  },
  icon: {
    marginRight: 10,
  },
  image: {
    width: 38,
    height: 38,
  },
});
