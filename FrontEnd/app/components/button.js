import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native'; 

function Button({ onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style // Apply custom styles passed from parent
      ]}
    >
      <Text style={styles.text}>Create account</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // Styles based on the Login.js design (now centralized here):
    backgroundColor: '#1E1E1E', 
    borderRadius: 100, // Set to 8 to match the look of the AuthButton
    paddingVertical: 17, 
    paddingHorizontal: 90,
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    // Slightly lighter color on press
    backgroundColor: '#3e414b', 
    opacity: 0.9,
  },
  text: {
    // Text styles based on the Login.js design:
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;