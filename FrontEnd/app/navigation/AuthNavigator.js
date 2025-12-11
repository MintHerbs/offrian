// app/navigation/AuthNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import LoginScreen from "../screens/LoginScreen"; 
import TestScreen from "../screens/TestScreen";

// console.log("AuthNavigator: LoginScreen import is:", LoginScreen);
// if (!LoginScreen) {
//   console.error("CRITICAL: LoginScreen is undefined in AuthNavigator. Check LoginScreen.js exports or circular dependencies.");
// }

// import RegisterScreen from "../screens/RegisterScreen"; // Uncomment when created
// import WelcomeScreen from "../screens/WelcomeScreen";   // Uncomment when created

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    {/* I've set Login as the first screen temporarily for testing. 
      Once WelcomeScreen is ready, move it back to the top.
    */}
    <Stack.Screen
      name="Login"
      component={TestScreen}
      options={{ headerShown: false }} // Hides the default nav bar since your screen has its own header
    />

    {/* <Stack.Screen 
      name="Welcome" 
      component={WelcomeScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen name="Register" component={RegisterScreen} /> 
    */}
  </Stack.Navigator>
);

export default AuthNavigator;