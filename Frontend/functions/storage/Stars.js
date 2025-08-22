import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Ukládá počet stars do AsyncStorage.
 * @param {number} value - Počet stars, který chceme uložit.
 */
export async function saveStars(value) {
  if (value === undefined || value === null) return; // nic neukládej
  try {
    await AsyncStorage.setItem('stars', JSON.stringify(value));
  } catch (e) {
    console.error('Chyba při ukládání stars:', e);
  }
}

/**
 * Načítá počet stars z AsyncStorage.
 * Vrací číslo, i když je v storage starý objekt { stars: 5 }.
 * Pokud není nic uloženo, vrací 0.
 */
export async function loadStars() {
  try {
    const jsonValue = await AsyncStorage.getItem('stars');
    if (!jsonValue) return 0;

    const parsed = JSON.parse(jsonValue);

    // Pokud je uložen objekt { stars: number }, vrať jen číslo
    if (parsed && typeof parsed === 'object' && 'stars' in parsed) {
      return parsed.stars;
    }

    // Pokud je číslo, vrať číslo
    if (typeof parsed === 'number') {
      return parsed;
    }

    // V ostatních případech vrať 0
    return 0;
  } catch (e) {
    console.error('Chyba při načítání stars:', e);
    return 0;
  }
}

/**
 * Vymaže stars z AsyncStorage.
 * Používá se např. pro reset nebo odstranění starých dat.
 */
export async function removeStars() {
  try {
    await AsyncStorage.removeItem('stars');
  } catch (e) {
    console.error('Chyba při mazání stars:', e);
  }
}
