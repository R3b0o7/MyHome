import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, secureTextEntry, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholderTextColor="transparent"
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#203562', // Color del borde inferior
    backgroundColor: '#E0E4F2', // Fondo
    height: 40,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    top: 5,
    left: 5,
    height: 40,
    paddingBottom: 10,
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    top: 1, // Altura deseada para el placeholder
    left: 10, // Ajusta el espacio desde la izquierda
    fontSize: 10, // Tamaño del placeholder
    color: '#203562', // Color del placeholder
  },
});

export default CustomTextInput;
