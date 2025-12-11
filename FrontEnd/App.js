// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import LoginScreen from "./app/screens/LoginScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
// import navigationTheme from "./app/navigation/navigationTheme"; // Uncomment this line if you have a theme file

export default function App() {
  return (
    <LoginScreen />
  );
}