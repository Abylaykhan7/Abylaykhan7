import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import ChatScreen from '../screens/ChatScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ShopsScreen from '../screens/ShopsScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C8102E',
    background: '#ffffff',
    card: '#ffffff',
    text: '#111111',
    border: '#e2e2e2',
    notification: '#C8102E',
  },
};

export default function BottomTabs() {
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: '#C8102E',
          tabBarInactiveTintColor: '#888',
          tabBarIcon: ({ color, size }) => {
            const iconName =
              route.name === 'Chat' ? 'chatbubble-ellipses' :
              route.name === 'Matches' ? 'trophy' :
              route.name === 'Shops' ? 'storefront' :
              'megaphone';
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Matches" component={MatchesScreen} />
        <Tab.Screen name="Shops" component={ShopsScreen} />
        <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
