import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Data uložena pod klíčem: ${key}`);
    console.log(jsonValue)
  } catch (e) {
    console.error('Chyba při ukládání dat:', e);
  }
}
