import React from "react";
import { StyleSheet, View } from "react-native";
// 1. Import SafeAreaView from the new library
import { SafeAreaView } from "react-native-safe-area-context";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // 2. I removed 'paddingTop: Constants.statusBarHeight' 
    // The new SafeAreaView applies the necessary padding automatically.
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;