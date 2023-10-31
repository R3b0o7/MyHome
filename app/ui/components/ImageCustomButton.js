import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const CustomButton = ({ title, onPress, style, imageSource }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Image style={styles.imageStyle} source={imageSource} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    position: 'relative',
    backgroundColor: '#E0E4F2',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Roboto',
    fontWeight: '500',
    color: '#4363AC',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  imageStyle: {
    height:25,
    width:25,
    marginLeft: 3,
    marginRight: 15
  }
});

export default CustomButton;
