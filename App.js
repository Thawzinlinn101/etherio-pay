import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Transfer from './src/containers/Transfer';
import NavigatorScreen from './src/containers/Navigator';
import Profile from './src/containers/Profile';
import Received from './src/containers/Received';
import Transfered from './src/containers/Transfered';
import Login from './src/containers/Login';
import EmptyScreen from './src/containers/EmptyScreen';
import OTPScreen from './src/containers/OTPScreen';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      console.log('UseEffect:App #user', user);
      setUser(user);
      if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${await user.getIdToken()}`;
      }
      if (initializing) setInitializing(false);

    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmptyScreen" screenOptions={{ headerStyle: { backgroundColor: '#e041b1' } }} >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Received" component={Received} />
        <Stack.Screen name="Transfered" component={Transfered} />
        <Stack.Screen name="Transfer" component={Transfer} />
        <Stack.Screen name="HomeScreen" component={NavigatorScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="EmptyScreen" component={EmptyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
