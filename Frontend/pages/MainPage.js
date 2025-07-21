import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, AppState } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from 'react-native-modal';
import Header from '../components/header';
import Slider from '@react-native-community/slider';

export default function MainPage() {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const appState = useRef(AppState.currentState);
  const intervalRef = useRef(null);
  const hasUserLeftDuringTimer = useRef(false);


  const toggleModal = () => setModalVisible(!isModalVisible);

  const timer = (startMinutes) => {
    
    setIsTimerRunning(true);
    let totalTime = startMinutes * 60;

    intervalRef.current = setInterval(() => {
      totalTime--;

      const newMinutes = Math.floor(totalTime / 60);
      const newSeconds = totalTime % 60;

      setMinutes(newMinutes);
      setSeconds(newSeconds);

      if (totalTime <= 0) {
        clearInterval(intervalRef.current);
        setIsTimerRunning(false);
        console.log("Doběhlo to");
      }
    }, 1000);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'active' && nextAppState === 'background') {
        // Uživatel opustil aplikaci – zruš timer
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTimerRunning(false);
          hasUserLeftDuringTimer.current=true;
          setMinutes(30);
          setSeconds(0);
          console.log('Timer zrušen, protože uživatel opustil aplikaci');
        }
      }

      if (appState.current === 'background' && nextAppState === 'active' && hasUserLeftDuringTimer.current) {
        // Návrat do aplikace
        alert('Odešel jsi z appky');
        hasUserLeftDuringTimer.current = false
        
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
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
          {
            () => (
              <Text style={styles.timeText}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </Text>
            )
          }
        </AnimatedCircularProgress>

        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={30} // změněno z 1 na 30
          maximumValue={120}
          step={5} // změněno ze 1 na 5
          value={minutes}
          minimumTrackTintColor="#66BB6A"
          maximumTrackTintColor="#C8E6C9"
          thumbTintColor="#388E3C"
          onValueChange={setMinutes}
          disabled={isTimerRunning} // deaktivuje slider při běžícím timeru
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.buttonSecondary} onPress={toggleModal}>
          <Text style={styles.buttonText}>CHOOSE ANIMAL</Text>
        </Pressable>
        <Pressable
          style={styles.buttonPrimary}
          onPress={() => timer(minutes)}
          disabled={isTimerRunning}
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
          {/* Obsah modalu */}
        </View>
      </Modal>

      <StatusBar style="auto" />
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
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
    padding: 80,
  },
  buttonPrimary: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: 200,
  },
  buttonSecondary: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#4FC3F7',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  timeText: {
    fontSize: 30,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 50,
    padding: 130,
  },
});
