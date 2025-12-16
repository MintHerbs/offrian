// app/screens/Welcome.js

import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Screen from '../components/screen';
import AuthButton from '../components/authButton';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../components/button';
import colors from '../config/colors';

import LogoIcon from '../assets/Logo.svg';
import AppleIcon from '../assets/Apple.svg';

const GoogleAsset = require('../assets/Google.png');
const GoogleIcon = ({ width, height }) => (
  <Image
    source={GoogleAsset}
    style={{ width: width, height: height }}
    resizeMode="contain"
  />
);

const WelcomeScreen = ({ navigation }) => {
  const handleSocialLogin = (provider) => console.log(`Continue with ${provider}`);
  const handleCreateAccount = () => navigation.navigate("Register");

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.contentContainer}>

        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <LogoIcon width={100} height={100} />
          </View>
          <Text style={styles.title}>Welcome to Doktor</Text>
          <Text style={styles.subtitle}>Connect to a Doctor!</Text>
        </View>

        <View style={styles.spacer} />

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

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Create account"
            onPress={handleCreateAccount}
            style={styles.createAccountButton}
          />
        </View>

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
    backgroundColor: colors.background,
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40
  },
  topSection: {
    alignItems: 'center'
  },
  logoContainer: {
    marginBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    color: '#707070'
  },
  spacer: {
    flex: 0.3,
    minHeight: 50
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%'
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },

  footer: {
    marginTop: 'auto',
    paddingTop: 20
  },
  footerText: {
    fontSize: 14,
    color: '#000'
  },
  loginLink: {
    fontWeight: '700',
    color: '#1E1E1E'
  }
});

export default WelcomeScreen;
