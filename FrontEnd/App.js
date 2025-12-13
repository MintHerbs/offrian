import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import Navbar from "./app/navigation/navbar";
import { supabase } from "./app/lib/supabase";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session && session.user ? <Navbar /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
