import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import Screen from "../components/screen";
import AppTextInput from "../components/AppTextInput";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/button";
import colors from "../config/colors";

// Assets
import Logo from "../assets/Logo.svg";
import UserIcon from "../assets/form icons/User.svg";

import { supabase } from "../lib/supabase";

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
});

function UsernameScreen({ navigation, route }) {
    const [loading, setLoading] = useState(false);

    // Retrieve params passed from BirthdayScreen
    const { name, email, password, dateOfBirth } = route?.params || {};



    const handleRegister = async (values) => {
        setLoading(true);

        const {
            username
        } = values;

        const registrationData = {
            name,
            email,
            password,
            dateOfBirth,
            username,
        };

        try {
            // 1. Sign up with Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                        username: username,
                        date_of_birth: dateOfBirth, // standardized key
                    },
                },
            });

            if (error) {
                Alert.alert("Registration Error", error.message);
                setLoading(false);
                return;
            }

            // 2. Insert into profiles table (if needed for username login lookup)
            // Note: This relies on a 'profiles' table existing. 
            // If it doesn't exist, this part will fail silently or log error depending on RLS.
            // We'll attempt it but not block success on it if the auth user is created.
            if (data?.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            username: username,
                            email: email,
                        }
                    ]);

                if (profileError) {
                    console.log("Profile creation error (optional):", profileError.message);
                }
            }

            Alert.alert(
                "Success",
                "Account created! Please check your email to verify your account.",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }] // Navigate to Login or let session state handle it
            );

            // If session auto-updates in App.js, navigation might happen automatically, 
            // but usually email confirmation is required by default. 
            // If email confirmation is disabled, App.js will switch to Navbar automatically.

        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <Screen style={styles.screen}>
                        <View style={styles.header}>
                            <Logo width={105} height={105} />
                            <Text style={styles.title}>Username</Text>
                            <Text style={styles.subtitle}>Pick a username</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Formik
                                initialValues={{ username: "" }}
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
                                        <AppTextInput
                                            icon={UserIcon}
                                            placeholder="Username"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            onBlur={() => setFieldTouched("username")}
                                            onChangeText={handleChange("username")}
                                            editable={!loading}
                                        />
                                        <ErrorMessage error={errors.username} visible={touched.username} />

                                        <View style={styles.buttonWrapper}>
                                            <Button
                                                title="Register"
                                                onPress={handleSubmit}
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

export default UsernameScreen;
