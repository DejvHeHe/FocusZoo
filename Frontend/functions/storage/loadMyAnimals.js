import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadData(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    const data=jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log("loaded data", data);
    return data;
  } catch (e) {
    console.error('Chyba při načítání dat:', e);
    return [];
  }
}
