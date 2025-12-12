// app/components/PasswordSection.js
import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

// Icons
import PasswordIcon from "../assets/form icons/Password.svg";

function PasswordSection({ loading }) {
  // Grab formik functions directly from context
  const {
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values, // Optional: if you need to access values directly
  } = useFormikContext();

  return (
    <View>
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
      <ErrorMessage
        error={errors.confirmPassword}
        visible={touched.confirmPassword}
      />
    </View>
  );
}

export default PasswordSection;