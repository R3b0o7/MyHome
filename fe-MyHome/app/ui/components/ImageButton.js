import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ImageButton = ({ imageSource, onPress, buttonStyle, imageStyle  }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Image style={[styles.imageStyle, imageStyle]} source={imageSource} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 10,
    position: 'relative',
    //backgroundColor: '#E0E4F2',
  },
  imageStyle: {
    height: 40, // Ajusta la altura de la imagen según tus necesidades
    width: 40, // Ajusta el ancho de la imagen según tus necesidades
  }
});

export default ImageButton;