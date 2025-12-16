import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// NOTE: We cannot directly import SVG files and render them as components
// in a standard React Native/Expo setup without an external library (like 
// react-native-svg-transformer). Since you explicitly stated "DO NOT USE 
// SVG FROM IMPORTS," we will use a placeholder or assume a component is 
// passed. 

// **ASSUMPTION:** We will treat the 'IconSVG' prop as a component that 
// has already been correctly loaded (e.g., using a workaround or a 
// component that *looks* like the SVG).

const AuthButton = ({ text, IconSVG, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7} // For better user feedback
    >
      {/* Container for the icon and text */}
      <View style={styles.content}>
        {/* Render the Icon component passed as a prop */}
        {IconSVG && (
          <View style={styles.iconContainer}>
            <IconSVG width={24} height={24} />
          </View>
        )}

        {/* Render the button text */}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // 1. Transparent Background
    backgroundColor: 'transparent',

    // 2. The Border Style
    borderWidth: 1,
    // Use an RGBA value for color and 10% opacity (0.1)
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 100, // Standard button border radius
    borderWidth: 1.5,

    // Default Padding (Adjust as needed to match button.js)
    paddingVertical: 15,
    paddingHorizontal: 40,

    // To position the icon and text correctly
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%', // Standard width
    alignSelf: 'center', // Center the button on the screen
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    // Positioning the icon to the far left of the text
    position: 'absolute',
    left: 0,
    marginLeft: 10, // Adjust spacing from the left edge of the button
  },
  text: {
    // Default text styles (adjust font size/family as needed)
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    right: 8,
  },
});

export default AuthButton;