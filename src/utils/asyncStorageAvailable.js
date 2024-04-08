import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function asyncStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    await AsyncStorage.setItem(key, key);
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
}
