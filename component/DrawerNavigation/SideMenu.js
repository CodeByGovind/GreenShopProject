import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import VegetableList from '../ReduxThunk/UI/VegetableList';
import AddToCart from '../Redux/AddToCart'
import VegetableListe from '../ReduxThunk/UI/VegetableListe';


function AboutUs({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('NotificationsScreen')}
        title="Go to notifications"
      />
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>AboutUs</Text>
    </View>
  );
}
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function SideMenu() {
  return (
          <Drawer.Navigator initialRouteName="Home" 
          screenOptions={{
            unmountOnBlur: true
          }}>
            <Drawer.Screen name="Vegetables" component={VegetableListe} />
            <Drawer.Screen name="AboutUs" component={AboutUs} />
            <Drawer.Screen name="AddToCart" component={AddToCart} />
            <Drawer.Screen name="NotificationsScreen" component={NotificationsScreen} />

          </Drawer.Navigator>
  );
}

