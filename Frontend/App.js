import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import IntroPage2 from './pages/IntroPage2';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyAnimals from './pages/MyAnimals';
import UnlockAnimalsPage from './pages/UnlockAnimalPage';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StarsProvider } from './context/StarsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordResetPage1 from './pages/PasswordResetPage1';
import PasswordResetPage2 from './pages/PasswordResetPage2';


const animalsUnlocked = require('./assets/animals_unlocked.json');
const animalsLocked = require('./assets/animals_locked.json');

const Stack = createNativeStackNavigator();

export default function App() {
  const [storageReady, setStorageReady] = useState(false);
  const [initialRouteName,setInitialRouteName]=useState("Main")
  

  useEffect(() => {
    const initStorage = async () => {
      try {
        // Clear storage for testing (optional)
        const token=await AsyncStorage.getItem("token")
        const onBoarding=await AsyncStorage.getItem("onBoarding")
        

        if (!onBoarding) {
          setInitialRouteName("Intro");
        } else {
          setInitialRouteName("Main");
        }



        // Initialize locked animals if missing
        const lockedJSON = await AsyncStorage.getItem('animalsLocked');
        if (!lockedJSON) {
          await AsyncStorage.setItem('animalsLocked', JSON.stringify(animalsLocked));
        }

        // Initialize unlocked animals if missing
        const unlockedJSON = await AsyncStorage.getItem('animalsUnlocked');
        if (!unlockedJSON) {
          await AsyncStorage.setItem('animalsUnlocked', JSON.stringify(animalsUnlocked));
        }

        setStorageReady(true); // storage is ready
      } catch (e) {
        console.error("Storage init failed:", e);
      }
    };

    initStorage();
  }, []);

  if (!storageReady) return null; // wait until storage is ready

  return (
    <StarsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro"/*{initialRouteName}*/ screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={IntroPage} />
          <Stack.Screen name="Intro2" component={IntroPage2}  />
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Register" component={RegisterPage}/>
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="MyAnimals" component={MyAnimals}/>
          <Stack.Screen name="UnlockAnimal" component={UnlockAnimalsPage}/>
          <Stack.Screen name="PasswordReset1" component={PasswordResetPage1}/>
          <Stack.Screen name="PasswordReset2" component={PasswordResetPage2}/>
        </Stack.Navigator>
        <Toast />
        <StatusBar style="auto" />
      </NavigationContainer>
    </StarsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
