import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
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
import { StarsProvider } from './context/StarsContext'; // náš context
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const clearStars = async () => {
      try {
        await AsyncStorage.removeItem('stars');
        console.log('Stars byly vymazány z AsyncStorage.');
      } catch (e) {
        console.error('Chyba při mazání stars:', e);
      }
    };

    clearStars();
  }, []);

  return (
    <StarsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={IntroPage} />
          <Stack.Screen name="Intro2" component={IntroPage2} />
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Register" component={RegisterPage}/>
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="MyAnimals" component={MyAnimals}/>
          <Stack.Screen name="UnlockAnimal" component={UnlockAnimalsPage}/>
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
