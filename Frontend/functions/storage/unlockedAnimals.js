import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadUnlockedAnimals()
{
    const unlockedJSON = await AsyncStorage.getItem('animalsUnlocked');
    const unlocked = unlockedJSON ? JSON.parse(unlockedJSON) : [];
    return unlocked;

}
export async function saveUnlockedAnimals(animal)
{
    const unlocked= await loadUnlockedAnimals()
    unlocked.push(animal)
    await AsyncStorage.setItem('animalsUnlocked', JSON.stringify(unlocked));

}