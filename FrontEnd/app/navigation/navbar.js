import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screen Imports
import InboxScreen from '../screens/InboxScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Icon Imports
import msg_inactive from "../assets/navigation/msg_inactive.svg";
import msg_active from "../assets/navigation/msg_active.svg";

import heart_inactive from "../assets/navigation/heart_inactive.svg";
import heart_active from "../assets/navigation/heart_active.svg";

import explore_inactive from "../assets/navigation/explore_inactive.svg";
import explore_active from "../assets/navigation/explore_active.svg";

import profile_inactive from "../assets/navigation/profile_inactive.svg";
import profile_active from "../assets/navigation/profile_active.svg";

const Tab = createBottomTabNavigator();

function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Icon logic
        tabBarIcon: ({ focused }) => {
          let IconComponent;

          if (route.name === "Inbox") {
            IconComponent = focused ? msg_active : msg_inactive;
          } else if (route.name === "Notification") {
            IconComponent = focused ? heart_active : heart_inactive;
          } else if (route.name === "Explore") {
            IconComponent = focused ? explore_active : explore_inactive;
          } else if (route.name === "Profile") {
            IconComponent = focused ? profile_active : profile_inactive;
          }

          return <IconComponent width={24} height={24} />;
        },

        // Colors
        tabBarActiveTintColor: '#2D2D41',
        tabBarInactiveTintColor: '#898AA5',

        // Hide header
        headerShown: false,

        // Bold label when active
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color, fontWeight: focused ? 'bold' : '400', fontFamily: 'roboto', fontSize: 11 }}>
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default Navbar;
