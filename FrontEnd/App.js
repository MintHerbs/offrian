import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import Navbar from "./app/navigation/navbar";
import { supabase } from "./app/lib/supabase";
import { View, ActivityIndicator } from "react-native";
import InboxScreen from "./app/screens/InboxScreen";

export default function App() {
  return (
    <InboxScreen />
  );
}
