import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readValue(inputKey) {
  const val = await AsyncStorage.getItem(inputKey);
  return val != null ? JSON.parse(val) : null;
}
export async function saveValue(inputKey, inputValue) {
  // console.log('set value async storage-----', inputValue);
  await AsyncStorage.setItem(inputKey, inputValue);
}

export async function removeValue(inputKey) {
  try {
    const val = await AsyncStorage.removeItem(inputKey);
    // console.log('remove value from asyncstorage-----', val);
  } catch (e) {
    console.log(e);
  }

}
