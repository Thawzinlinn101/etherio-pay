
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Transfer from '../Transfer';
import HomeScreen from '../Home';
import Profile from '../Profile';
import Received from '../Received';
import Transfered from '../Transfered';

const Stack = createNativeStackNavigator();

export default function Navigator(props) {
    // console.log("tzl -----", props);
    // props.setShowTabs(true);
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerStyle: { backgroundColor: '#e041b1' } }}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Received" component={Received} />
                {/* <Stack.Screen name="Transfered" component={() => <Transfered hideBottomTab={() => props.setShowTabs(false)} />} /> */}
                <Stack.Screen name="Transfered" component={Transfered} options={{ tabBarStyle: { display: "none", } }} />
                <Stack.Screen name="Transfer" component={Transfer} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}