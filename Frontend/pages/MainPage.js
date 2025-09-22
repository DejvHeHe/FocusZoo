import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, AppState, ScrollView, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from 'react-native-modal';
import Header from '../components/header';
import Slider from '@react-native-community/slider';
import AnimalPick from '../components/animalPicker';
import SaveAnimalModal from '../components/saveAnimalModal';
import { getAnimalImage } from '../functions/imageMap';
import { useStars } from '../context/StarsContext';
import { loadUnlockedAnimals } from '../functions/storage/unlockedAnimals';
import useAppStateHandler from '../hooks/useAppStateHandler';
import useTimer from '../hooks/useTimer';   
import { REWARD_RULES } from '../constants/REWARD_RULES'; 
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MainPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [animalPicked, setAnimal] = useState();
  const [animals, setAnimals] = useState([]);

  const { setStars } = useStars();

  const appState = useRef(AppState.currentState);
  const hasUserLeftDuringTimer = useRef(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const {
    minutes,
    seconds,
    isTimerRunning,
    isAnimalSaveVisible,
    setAnimalSaveVisible,
    startTimer,
    intervalRef,
    setMinutes,
    setSeconds,
    setIsTimerRunning,
  } = useTimer(setStars, REWARD_RULES); // ✅ renamed to useTimer

  useAppStateHandler({
    appState,
    intervalRef,
    setIsTimerRunning,
    setMinutes,
    setSeconds,
    hasUserLeftDuringTimer,
  });
  const setOnboarding = async () => {
    const onboardingDone = await AsyncStorage.getItem("onBoarding");
    if (!onboardingDone) {
      await AsyncStorage.setItem("onBoarding", "true"); // store as string
    }
};

  useEffect(() => {
    loadUnlockedAnimals().then(setAnimals);
    setOnboarding()
   
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.contentContainer}>
        <AnimatedCircularProgress
          size={280}
          width={10}
          fill={(minutes / 120) * 100}
          tintColor="#388E3C"
          backgroundColor="#C8E6C9"
        >
          {() => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.timeText}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </Text>
              {animalPicked && (
                <Image
                  source={getAnimalImage(animalPicked.photo)}
                  style={{
                    width: 200,
                    height: 200,
                    position: 'absolute',
                    borderRadius: 100,
                    opacity: 0.4,
                  }}
                />
              )}
            </View>
          )}
        </AnimatedCircularProgress>

        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={animalPicked ? animalPicked.cost : 1}
          maximumValue={120}
          step={5}
          value={minutes}
          minimumTrackTintColor="#66BB6A"
          maximumTrackTintColor="#C8E6C9"
          thumbTintColor="#388E3C"
          onValueChange={setMinutes}
          disabled={isTimerRunning}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.buttonSecondary} onPress={toggleModal}>
          <Text style={styles.buttonText}>CHOOSE ANIMAL</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonPrimary, (isTimerRunning || !animalPicked) && { opacity: 0.5 }]}
          onPress={() => startTimer(minutes)}
          disabled={isTimerRunning || !animalPicked}
        >
          <Text style={styles.buttonText}>START</Text>
        </Pressable>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.animalList}>
            {animals.map((animal, index) => (
              <AnimalPick
                key={index}
                type={animal.type}
                photo={animal.photo}
                time={minutes}
                cost={animal.cost}
                onClose={() => setModalVisible(false)}
                animalSet={() => setAnimal(animal)}
                animal={animal}
              />
            ))}
          </ScrollView>
        </View>
      </Modal>

      {isAnimalSaveVisible && (
        <SaveAnimalModal
          onClose={() => setAnimalSaveVisible(false)}
          isAnimalSaveVisible={isAnimalSaveVisible}
          animalPicked={animalPicked}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  headerContainer: { paddingTop: 40, paddingHorizontal: 20, paddingBottom: 10 },
  contentContainer: { flex: 3, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  buttonPrimary: { backgroundColor: '#388E3C', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginTop: 15, width: 200, alignItems: 'center' },
  buttonSecondary: { backgroundColor: '#4FC3F7', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginTop: 15, width: 200, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buttonsContainer: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 20 },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: { backgroundColor: '#4FC3F7', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, minHeight: 300, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  animalList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 16 },
  timeText: { fontSize: 36, fontWeight: 'bold', color: '#333' },
});
