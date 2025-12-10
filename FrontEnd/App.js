// App.js

import { SafeAreaProvider } from "react-native-safe-area-context";
// Import the LoginScreen you just created
import LoginScreen from "./app/screens/Login";

export default function App() {
  return (
    <SafeAreaProvider>
       {/* Render the Login Screen */}
       <LoginScreen />
    </SafeAreaProvider>
  );
}