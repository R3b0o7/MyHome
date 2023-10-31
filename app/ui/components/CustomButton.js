import React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({ title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100, // Corresponds to border-radius: 100px;
    alignItems: 'center', // Corresponds to align-items: center;
    justifyContent: 'center', // Corresponds to justify-content: center;
    overflow: 'hidden', // Corresponds to overflow: hidden;
    flexDirection: 'row', // Corresponds to display: flex;
    gap: 8, // Corresponds to gap: 8px;
    padding: 10, // Padding is 10
    position: 'relative', // Corresponds to position: relative;
    backgroundColor: '#E0E4F2', // Background color
    // Añade sombreado al borde
    elevation: 5, // Puedes ajustar el valor según tus preferencias
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 14, // Font size
    lineHeight: 20, // Line height
    fontFamily: 'Roboto', // Font family
    fontWeight: '500', // Font weight
    color: '#4363AC', // Text color
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});

export default CustomButton;
