// utils/getAnimalImage.js
const imageMap = {
  cat: require('../assets/all_animals_photo/cat.jpg'),
  dog: require('../assets/all_animals_photo/dog.jpg'),
};

export function getAnimalImage(type) {
  return imageMap[type] || null; // pokud typ neexistuje, vrátí null
}
