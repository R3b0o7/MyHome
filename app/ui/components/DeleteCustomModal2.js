import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Modal, Text, StyleSheet } from 'react-native';
import { SERVER_URL } from '../../config/config';
import axios from 'axios';

import NavigatorConstant from '../../navigation/NavigatorConstant';
import CustomButton from '../components/CustomButton';
import CustomTextInput from './CustomTextInput';
import I18n from '../../assets/strings/I18';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteCustomModal = ({ visible, onClose }) => {

  const navigation = useNavigation();

  const [confirmationText, setConfirmationText] = useState(''); // Estado para el texto de confirmación

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = () => {
    if (confirmationText === 'ELIMINAR') {
    // Obtener el token del AsyncStorage
      getToken()
        .then((token) => {
          // Realizar una solicitud DELETE para borrar la cuenta del usuario
          axios
            .delete(`${SERVER_URL}/api/usersComun/delete`, {
              headers: {
                Authorization: token,
              },
            })
            .then((response) => {
              // Realizar alguna acción adicional si es necesario
              alert("Cuenta borrada con éxito.");
              navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN);
            
            })
            .catch((error) => {
              console.error("Error al borrar la cuenta:", error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Por favor, escriba "ELIMINAR" para confirmar.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

            <Text style={{fontSize:25, color: 'black'}}>Eliminar definitivamente</Text>
            <Text style={{fontSize:15}}>para eliminar la cuenta de manera definitiva escriba ELIMINAR en mayusculas en el cadro de texto</Text>
            
            <CustomTextInput
              icon={require('../../assets/images/Icons/lightMode/cancel.png')}
              onChangeText={(text) => setConfirmationText(text)}
            />
            
            <View style={styles.buttonContainer}>
              <CustomButton style={{marginLeft: 100}} title={I18n.t('cancel')}  onPress={onClose} />
              <CustomButton style={{marginLeft: 10}} title={I18n.t('confirm')} onPress={handleDeleteAccount} />
            </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center', //posisiona el modal en el centro de la pantalla en la linea vertical
    alignItems: 'center', //posisiona el modal en el centro de la pantalla en la linea horizontal
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#E0E4F2',
    padding: 40,
    borderRadius: 50,
    alignItems: 'flex-start',
    width:350
  },
  centeredTextInput: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
  },
});
export default DeleteCustomModal;