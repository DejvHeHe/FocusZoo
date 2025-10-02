// Header.js
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useStars } from '../context/StarsContext'; // ✅ import context hooku
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();
  const { stars } = useStars(); // ✅ hvězdy z contextu

  const toggleModal = () => setModalVisible(!isModalVisible);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const Logout = async () => {
    await AsyncStorage.removeItem("token");
    setLoggedIn(false);
  };

  // ✅ kontrola login stavu pokaždé, když se vrátíme na tuhle obrazovku
  useFocusEffect(
    useCallback(() => {
      checkLoggedIn();
    }, [])
  );

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

          <Pressable onPress={() => { toggleModal(); navigation.navigate('UnlockAnimal'); }}>
            <Text style={styles.menuItem}>🔒 Unlock animals</Text>
          </Pressable>

          {!isLoggedIn && (
            <Pressable onPress={() => { toggleModal(); navigation.navigate('Login'); }}>
              <Text style={styles.menuItem}>🔑 Login</Text>
            </Pressable>
          )}

          {isLoggedIn && (
            <Pressable onPress={() => { toggleModal(); Logout(); }}>
              <Text style={styles.menuItem}>🚪 Sign out</Text>
            </Pressable>
          )}
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
