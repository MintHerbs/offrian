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

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
});

function UsernameScreen({ navigation, route }) {
    const [loading, setLoading] = useState(false);

    // Retrieve params passed from BirthdayScreen
    const { name, email, password, dateOfBirth } = route?.params || {};

    const handleRegister = async (values) => {
        setLoading(true);

        // Combine all data
        const registrationData = {
            name,
            email,
            password,
            dateOfBirth,
            username: values.username,
        };

        console.log("Final Registration Data:", registrationData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        Alert.alert(
            "Submission Successful!",
            "Account created successfully (Simulated)."
        );

        setLoading(false);
        // Navigation to login or home would happen here
        // navigation.navigate("Login");
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
