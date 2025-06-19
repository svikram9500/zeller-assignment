import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerListScreen from '../Screens/CustomerListScreen/CustomerListScreen';
import UserDetailScreen from '../Screens/UserDetailScreen/UserDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="CustomerListScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="CustomerListScreen" component={CustomerListScreen} />
    <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
