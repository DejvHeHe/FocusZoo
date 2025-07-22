import React,{useState}from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function Header({rations,stars}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  return (
    <View style={styles.container}>
      {/* Ikony vlevo */}
      <View style={styles.icons}>
        <Text>{stars}</Text>
        <Ionicons name="star" size={24} color="#fbc02d" style={styles.icon} />
        <Text>{rations}</Text>
        <Image
          source={require('../assets/food-ration.png')}
          style={styles.image}
        />
      </View>

      {/* Option button vpravo */}
      <TouchableOpacity onPress={toggleModal} style={styles.optionButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="#333" />
      </TouchableOpacity>

      <Modal
              isVisible={isModalVisible}
              onBackdropPress={toggleModal}
              onSwipeComplete={toggleModal}
              swipeDirection="left"
              style={{ margin: 0, justifyContent: 'flex-start',width:"50%"}}
            >
              <View style={styles.modalContent}>
                {/* Obsah modalu */}
              </View>
      </Modal>
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
  modalContent: {
    backgroundColor: '#4FC3F7',
    padding: 20,
    height:"100%",
    
  },
});
