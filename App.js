import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigateScreen from './src/containers/Navigator';
import SettingsScreen from './src/containers/Setting';

const Tab = createBottomTabNavigator();


export default function App() {
  const [showTabs, setShowTabs] = React.useState(true);

  NavigateScreen.prototype.setShowTaps = setShowTabs

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home-sharp'
                : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-sharp' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={() => <NavigateScreen setShowTabs={setShowTabs} />} options={{
          headerShown: false,
          tabBarStyle: {
            display: showTabs ? "flex" : "none",
          }
        }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
