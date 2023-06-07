import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneSignIn from './PhoneAuthentication/PhoneDemo';
const AuthStack = createStackNavigator();
const AuthenticationStack = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{headerShown: false}}
        name={"PhoneSignIn"}
        component={PhoneSignIn}
      />
    </AuthStack.Navigator>
  );
};
export default AuthenticationStack;
