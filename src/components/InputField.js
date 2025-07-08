import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  error, 
  ...props 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.errorInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6c757d"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  errorInput: {
    borderColor: '#dc3545',
  },
  errorText: {
    marginTop: 4,
    color: '#dc3545',
    fontSize: 12,
  },
});

export default InputField;
