// app/components/button.js

import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import Constants from 'expo-constants';

function Button({ onPress, style, title, loading = false }) {
  // Check if running in Expo Go
  const isExpoGo = Constants.executionEnvironment === 'storeClient';

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.buttonPressed,
        loading && styles.buttonLoading
      ]}
    >
      {loading ? (
        isExpoGo ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <LoaderKit
            style={styles.loader}
            name={'BallDoubleBounce'}
            size={25}
            color="#FFFFFF"
          />
        )
      ) : (
        <Text style={styles.text}>{title || "Button"}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E1E1E',
    borderRadius: 100,
    paddingVertical: 19,
    paddingHorizontal: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonPressed: {
    backgroundColor: '#3e414b',
    opacity: 0.9
  },
  buttonLoading: {
    opacity: 0.7
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  loader: {}
});

export default Button;
