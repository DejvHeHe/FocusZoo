import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadLockedAnimals()
{
    const lockedJSON = await AsyncStorage.getItem('animalsLocked');
    const locked = lockedJSON ? JSON.parse(lockedJSON) : [];
    return locked;

}
export async function saveLockedAnimals(id)
{
    const locked= await loadLockedAnimals()
    const newLocked = locked.filter(a => a.id !== id);
    await AsyncStorage.setItem('animalsLocked', JSON.stringify(newLocked));

}