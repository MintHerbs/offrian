// app/screens/RegisterScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import Screen from "../components/screen";
// import GradientBackground from "../components/GradientBackground"; // Removed
import AppTextInput from "../components/AppTextInput";
import Button from "../components/button";
import ErrorMessage from "../components/ErrorMessage";
import colors from "../config/colors";

// Supabase Client (Removed)
// import { supabase } from "../lib/supabase"; 

// Assets
import Logo from "../assets/Logo.svg";
import PersonIcon from "../assets/register/User.svg";
import EmailIcon from "../assets/form icons/Email.svg";
import PasswordIcon from "../assets/form icons/Password.svg";
import CalendarIcon from "../assets/register/Calendar.svg";
const ArrowIcon = require("../assets/register/Arrow.png"); // Kept the path from the previous update

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

function RegisterScreen({ navigation }) {
  // Loading state is now ONLY used to simulate submission/disable button, 
  // without the complexity of the loading component itself.
  const [loading, setLoading] = useState(false);

  /* ========================================================================
   * PLACEHOLDER SUBMISSION HANDLER - Supabase logic removed
   * ======================================================================== */
  const handleRegister = (values) => {
    navigation.navigate("Birthday", values);
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Screen style={styles.screen}>
            {/* Header Section */}
            <View style={styles.header}>
              <Logo width={105} height={105} />
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Welcome</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              <Formik
                initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                onSubmit={handleRegister}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                  setFieldTouched,
                }) => (
                  <>
                    {/* Name Input */}
                    <AppTextInput
                      icon={PersonIcon}
                      placeholder="Name"
                      autoCapitalize="words"
                      autoCorrect={false}
                      onBlur={() => setFieldTouched("name")}
                      onChangeText={handleChange("name")}
                      editable={!loading}
                    />
                    <ErrorMessage error={errors.name} visible={touched.name} />

                    {/* Email Input */}
                    <AppTextInput
                      icon={EmailIcon}
                      placeholder="Email"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      onBlur={() => setFieldTouched("email")}
                      onChangeText={handleChange("email")}
                      editable={!loading}
                    />
                    <ErrorMessage error={errors.email} visible={touched.email} />

                    {/* Password Input */}
                    <AppTextInput
                      icon={PasswordIcon}
                      placeholder="Password"
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      onBlur={() => setFieldTouched("password")}
                      onChangeText={handleChange("password")}
                      editable={!loading}
                    />
                    <ErrorMessage error={errors.password} visible={touched.password} />

                    {/* Confirm Password Input */}
                    <AppTextInput
                      icon={PasswordIcon}
                      placeholder="Confirm Password"
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      onBlur={() => setFieldTouched("confirmPassword")}
                      onChangeText={handleChange("confirmPassword")}
                      editable={!loading}
                    />
                    <ErrorMessage error={errors.confirmPassword} visible={touched.confirmPassword} />

                    {/* Submit Button */}
                    <View style={styles.buttonWrapper}>
                      <Button
                        title="Next"
                        onPress={handleSubmit}
                        loading={loading} // Uses the loading prop for the visual spinner
                      // icon={ArrowIcon} // Uncomment if your Button component uses this prop
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </Screen>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  screen: {
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.onBackground,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 23,
    fontWeight: "600",
    color: colors.onBackground,
    marginBottom: 30,
  },
  formContainer: {
    width: "100%",
  },
  buttonWrapper: {
    marginTop: 15,
    marginBottom: 20,
  },
});

export default RegisterScreen;