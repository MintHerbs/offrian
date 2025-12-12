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
import CalendarIcon from "../assets/register/Calendar.svg";

const validationSchema = Yup.object().shape({
    dateOfBirth: Yup.string().required().label("Date of Birth"),
});

function BirthdayScreen({ navigation, route }) {
    const [loading, setLoading] = useState(false);

    // FIX: Added '?.' before params. 
    // This prevents the app from crashing if you are testing the screen directly.
    const { name, email, password } = route?.params || {};

    const handleRegister = (values) => {
        // Pass previous data + new DOB to the next screen
        navigation.navigate("Username", {
            name,
            email,
            password,
            dateOfBirth: values.dateOfBirth
        });
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
                            <Text style={styles.title}>Date of Birth</Text>
                            <Text style={styles.subtitle}>When were you born?</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Formik
                                initialValues={{ dateOfBirth: "" }}
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
                                            icon={CalendarIcon}
                                            placeholder="Date of Birth (MM/DD/YYYY)"
                                            autoCapitalize="none"
                                            onBlur={() => setFieldTouched("dateOfBirth")}
                                            onChangeText={handleChange("dateOfBirth")}
                                            editable={!loading}
                                        />
                                        <ErrorMessage error={errors.dateOfBirth} visible={touched.dateOfBirth} />

                                        <View style={styles.buttonWrapper}>
                                            <Button
                                                title="Next"
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

export default BirthdayScreen;