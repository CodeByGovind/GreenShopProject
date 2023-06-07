import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SideMenu from './DrawerNavigation/SideMenu';
import PaymentHistory from './PaymentHistory';

const RootStack = createStackNavigator();
const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Drawer"
        component={SideMenu}
        options={{
          // headerTitle: 'Home',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{
          headerTitle: 'History',
          headerShown: true,
        }}
      />
    </RootStack.Navigator>
  );
};
export default RootStackNavigator;
