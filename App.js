import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Transfer from '../EtherioPay/src/containers/Transfer';
import NavigatorScreen from '../EtherioPay/src/containers/Navigator';
import Profile from '../EtherioPay/src/containers/Profile';
import Received from '../EtherioPay/src/containers/Received';
import Transfered from '../EtherioPay/src/containers/Transfered';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerStyle: { backgroundColor: '#e041b1' } }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Received" component={Received} />
        <Stack.Screen name="Transfered" component={Transfered} />
        <Stack.Screen name="Transfer" component={Transfer} />
        <Stack.Screen name="HomeScreen" component={NavigatorScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
