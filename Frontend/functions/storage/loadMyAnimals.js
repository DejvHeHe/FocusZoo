import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadData(key) {
  try {
    const loadArray=[]
    const jsonValue = await AsyncStorage.getItem(key);
    loadArray.push(jsonValue != null ? JSON.parse(jsonValue) : null)
    console.log("loaded data",loadArray)
    return loadArray;
  } catch (e) {
    console.error('Chyba při načítání dat:', e);
    return null;
  }
}
