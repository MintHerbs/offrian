// app/navigation/AuthNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BirthdayScreen from "../screens/BirthdayScreen";
import UsernameScreen from "../screens/UsernameScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Birthday"
      component={BirthdayScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Username"
      component={UsernameScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;