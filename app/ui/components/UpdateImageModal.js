import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import ImageButton from '../components/ImageButton';
import I18n from '../../assets/strings/I18';

const UpdateImageModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <ImageButton 
                buttonStyle={{ height: 100, width: 150}}
                imageStyle={{ height: 80, width: 80 }}
                onPress={onClose} 
                imageSource={require('../../assets/images/Icons/lightMode/galery.png')}/>
            <Text style={{fontSize:18}}>Seleccionar de la galería</Text>
            <ImageButton 
                buttonStyle={{ height: 100, width: 150}}
                imageStyle={{ height: 80, width: 90 }}
                onPress={onClose} 
                imageSource={require('../../assets/images/Icons/lightMode/photo.png')}/>
            <Text style={{fontSize:18}}>Sacar Foto</Text>
            <CustomButton style={{marginTop: 20}} title={I18n.t('cancel')} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#E0E4F2',
    padding: 40,
    borderRadius: 50,
    alignItems: 'center',
    width:300
  },
});

export default UpdateImageModal;