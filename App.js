/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './component/ReduxThunk/Stores/VegetableStore';
import AuthenticationStack from './component/AuthenticationStack';
import RootStackNavigator from './component/RootStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('login')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  React.useEffect(() => {
    getData().then((response) => {
      console.log("App", response)
      setIsFirstLaunch(response)
    })
  }, [isFirstLaunch])

  return (
    <NavigationContainer>
      {isFirstLaunch == false ? (
        <AuthenticationStack />
      ) : (
        <RootStackNavigator />
      )}
    </NavigationContainer>
  );
}
const RNRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Text style={{ fontSize: 28 }}>Loading...</Text>}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
export default RNRedux;

