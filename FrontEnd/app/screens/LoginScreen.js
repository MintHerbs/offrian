 // app/screens/LoginScreen.js


import React, { useState } from "react";

import {

  StyleSheet,

  View,

  Text,

  KeyboardAvoidingView,

  Platform,

  ScrollView

} from "react-native";


import { Formik } from "formik";

import * as Yup from "yup";


import Screen from "../components/screen";

import AppTextInput from "../components/AppTextInput";

import Button from "../components/button";

import ErrorMessage from "../components/ErrorMessage";

import colors from "../config/colors";


import Logo from "../assets/Logo.svg";

import EmailIcon from "../assets/form icons/Email.svg";

import PasswordIcon from "../assets/form icons/Password.svg";


const validationSchema = Yup.object().shape({

  email: Yup.string().required().email().label("Email"),

  password: Yup.string().required().min(4).label("Password")

});


export default function LoginScreen({ navigation }) {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const handleLogin = async (values) => {

    console.log("Login attempt with:", values);

    setError("");

    setLoading(true);


    // Simulate API call

    await new Promise((resolve) => setTimeout(resolve, 2000));


    setLoading(false);


    // Example: setError("Login failed. Please check your credentials.");

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

            <View style={styles.header}>

              <Logo width={105} height={105} />

              <Text style={styles.title}>Login</Text>

              <Text style={styles.subtitle}>Welcome Back!</Text>

            </View>


            <View style={styles.formContainer}>

              <Formik

                initialValues={{ email: "", password: "" }}

                onSubmit={handleLogin}

                validationSchema={validationSchema}

              >

                {({

                  handleChange,

                  handleSubmit,

                  errors,

                  touched,

                  setFieldTouched

                }) => (

                  <>

                    <AppTextInput

                      icon={EmailIcon}

                      placeholder="Email"

                      autoCapitalize="none"

                      autoCorrect={false}

                      keyboardType="email-address"

                      textContentType="emailAddress"

                      onBlur={() => setFieldTouched("email")}

                      onChangeText={handleChange("email")}

                    />

                    <ErrorMessage error={errors.email} visible={touched.email} />


                    <AppTextInput

                      icon={PasswordIcon}

                      placeholder="Password"

                      secureTextEntry

                      autoCapitalize="none"

                      autoCorrect={false}

                      textContentType="password"

                      onBlur={() => setFieldTouched("password")}

                      onChangeText={handleChange("password")}

                    />

                    <ErrorMessage error={errors.password} visible={touched.password} />


                    <ErrorMessage error={error} visible={!!error} />


                    <View style={styles.buttonWrapper}>

                      <Button

                        title="Login"

                        onPress={handleSubmit}

                        style={styles.loginButton}

                        loading={loading}

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

    flex: 1

  },

  screen: {

    paddingHorizontal: 20

  },

  header: {

    alignItems: "center",

    marginTop: 60,

    marginBottom: 20

  },

  title: {

    fontSize: 28,

    fontWeight: "700",

    color: colors.onBackground,

    marginTop: 10

  },

  subtitle: {

    fontSize: 23,

    fontWeight: "600",

    color: colors.onBackground,

    marginBottom: 30

  },

  formContainer: {

    width: "100%"

  },

  buttonWrapper: {

    marginTop: 15

  },

  loginButton: {

    marginTop: 10

  }

}); 