import React,{useState}from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions,Text,Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

export default function Header({ rations, stars }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <View style={styles.container}>
      {/* levá strana */}
      <TouchableOpacity onPress={toggleModal}>
        <Ionicons name="ellipsis-vertical" size={24} color="#333" />
      </TouchableOpacity>

      {/* pravá strana */}
      <View style={styles.rightIcons}>
        <Text>{stars}</Text>
        <Ionicons name="star" size={24} color="#fbc02d" style={styles.icon} />
        
      </View>

      {/* modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        style={{ margin: 0, justifyContent: 'flex-start', width: '50%' }}
      >
        <View style={styles.modalContent}>
          <Pressable onPress={() => { toggleModal(); navigation.navigate('Main'); }}>
            <Text style={styles.menuItem}>🏠 Home</Text>
          </Pressable>
          <Pressable onPress={() => { toggleModal(); navigation.navigate('MyAnimals'); }}>
            <Text style={styles.menuItem}>🐾 My animals</Text>
          </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { marginHorizontal: 6 },
  image: { width: 32, height: 32 },
  modalContent: {
    backgroundColor: '#4FC3F7',
    padding: 20,
    height: '100%',
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 16,
  },
});

