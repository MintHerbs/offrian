// app/screens/Login.js

import React from 'react';
// MODIFIED: Add Image component to imports
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'; 
import Screen from '../components/screen'; 
import AuthButton from '../components/authButton';
import { FontAwesome } from '@expo/vector-icons'; 
import Button from '../components/button';

// --- SVG Imports (Requires metro.config.js setup) ---
import LogoIcon from '../assets/Logo.svg'; 
import AppleIcon from '../assets/Apple.svg';

// --- Google PNG Import FIX ---
// The PNG asset is required
const GoogleAsset = require('../assets/Google.png'); 
// MODIFIED: GoogleIcon is now a component wrapper for the PNG Image
const GoogleIcon = ({ width, height }) => (
    <Image 
        source={GoogleAsset} 
        style={{ width: width, height: height }} 
        resizeMode="contain"
    />
);
// FacebookIcon placeholder is removed

const LoginScreen = () => {
  const handleSocialLogin = (provider) => console.log(`Continue with ${provider}`);
  const handleCreateAccount = () => console.log("Navigating to Create Account");
  const handleLogin = () => console.log("Navigating to Login");

  return (
    <Screen style={styles.screen}>
      <View style={styles.contentContainer}>

        {/* --- 1. Logo and Title --- */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            {/* Renders the imported SVG component */}
            <LogoIcon width={100} height={100} />
          </View>
          <Text style={styles.title}>Welcome to Offrian</Text>
          <Text style={styles.subtitle}>Connect to the world</Text>
        </View>

        {/* This takes up the middle space to push buttons down */}
        <View style={styles.spacer} /> 

        {/* --- 2. Button Group --- */}
        <View style={styles.bottomSection}>
          <AuthButton
            text="Continue with Google"
            IconSVG={GoogleIcon}
            onPress={() => handleSocialLogin('Google')}
          />
          <AuthButton
            text="Continue with Apple"
            IconSVG={AppleIcon}
            onPress={() => handleSocialLogin('Apple')}
          />

          {/* --- 3. OR Divider --- */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* --- 4. Primary Create Account Button --- */}
          <Button 
            onPress={handleCreateAccount}
            style={styles.createAccountButton} 
          />
          
        </View>

        {/* --- 5. Footer Login Text --- */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Have an account already? 
            <Text 
              style={styles.loginLink} 
              onPress={handleLogin}
            >
              {" "}Login
            </Text>
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F9F5F8', 
    alignItems: 'center', 
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30, 
    alignItems: 'center',
    paddingTop: 80, 
    paddingBottom: 40,
  },
  topSection: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28, 
    fontWeight: '600', 
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#707070',
  },
  spacer: {
    flex: 1, // Pushes content down
    minHeight: 50, // Ensures minimum space
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  
  // --- Divider Styles ---
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  
  // New style for the imported Button component to preserve margin
  createAccountButton: {
    marginTop: 20,
  },
  
  // --- Footer Styles ---
  footer: {
    marginTop: 'auto', 
    paddingTop: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  loginLink: {
    fontWeight: '700', 
    color: '#1E1E1E', 
  },
});

export default LoginScreen;