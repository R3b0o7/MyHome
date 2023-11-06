import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL } from '../../../../config/config';
import axios from 'axios';

import I18n from '../../../../assets/strings/I18';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import ImageCustomButton from '../../../components/ImageCustomButton';
import UpdateImageModal from '../../../components/UpdateImageModal';
import DeleteCustomModal from '../../../components/DeleteCustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const SettingsUser = () => {

  const navigation = useNavigation();
  const [updateImageModalVisible, setUpdateImageModalVisible] = useState(false);

  const openUpdateImageModal = () => {
    setUpdateImageModalVisible(true);
  };

  const closeUpdateImageModal = () => {
    setUpdateImageModalVisible(false);
  };

  const [deleteCustomModalVisible, setDeleteCustomModalVisible] = useState(false);

  const openDeleteCustomModal = () => {
    setDeleteCustomModalVisible(true);
  };

  const closeDeleteCustomModal = () => {
    setDeleteCustomModalVisible(false);
  };

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    visibleEmail: '',
  });

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error(error);
    }
  };

  /*useEffect(() => {
    getToken()
      .then((token) => {
        axios.get(`${SERVER_URL}/api/users/me`, {
          headers: {
            'Authorization': token,
          },
        })
          .then((response) => {
            setUserData({
              userName: response.data.userName,
              email: response.data.email,
              visibleEmail: response.data.visibleEmail,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);*/

  const handleSaveChanges = () => {
    // Obtener token del AsyncStorage
    getToken().then((token) => {
      // Realizar una solicitud PUT para actualizar los datos del usuario
      axios.put(`${SERVER_URL}/api/users/saveChanges`, {
        userName: userData.userName,
        email: userData.email,
        visibleEmail: userData.visibleEmail,
      }, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          // Realizar alguna acción adicional si es necesario
          alert('Datos actualizados con éxito:');
          navigation.goBack();
        })
        .catch((error) => {
          console.error('Error al actualizar los datos del usuario:', error);
        });
    })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleDeleteAccount = () => {
  //   // Obtener el token del AsyncStorage
  //   getToken()
  //     .then((token) => {
  //       // Realizar una solicitud DELETE para borrar la cuenta del usuario
  //       axios
  //         .delete(`${SERVER_URL}/api/users/delete`, {
  //           headers: {
  //             Authorization: token,
  //           },
  //         })
  //         .then((response) => {
  //           // Realizar alguna acción adicional si es necesario
  //           alert("Cuenta borrada con éxito.");
  //           navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN);

  //         })
  //         .catch((error) => {
  //           console.error("Error al borrar la cuenta:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  // };

  const pressHandler = () => {
    Alert.alert("Guardar cambios", "Estás seguro que desas guardar cambios?", [
      { text: "Sí", onPress: () => handleSaveChanges() },
      { text: "No" }
    ])
  }

  // const pressDeleteAccount = () => {
  //   Alert.alert("BORRAR CUENTA", "Estás seguro que desas BORRAR LA CUENTA?", [
  //     { text: "Sí", onPress: () => handleDeleteAccount() },
  //     { text: "No" }
  //   ])
  // }

  const handleChangePasword = () => {
    navigation.push(NavigatorConstant.PROFILE_STACK.CHANGE_PASWORD);
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 39, alignSelf: 'center' }}>
        <Avatar.Image
          style={styles.shadow}
          size={200}
          source={require('../../../../assets/images/misc/logotipo.png')}
        />
      </View>

      <View style={{
        marginTop: -40,
        marginLeft: 270,
        marginRight: 100
      }}>
        <ImageCustomButton style={styles.imageStyle} onPress={openUpdateImageModal} imageSource={require('../../../../assets/images/Icons/pencil.png')} />
        <UpdateImageModal visible={updateImageModalVisible} onClose={closeUpdateImageModal} />
      </View>

      <View style={{ marginTop: 10 }}>
        <CustomTextInput
          label="Nombre"
          icon={require('../../../../assets/images/Icons/lightMode/perfil.png')}
          value={userData.userName}
          onChangeText={(value) => setUserData({ ...userData, userName: value })} // Actualizar el estado cuando el texto cambia
        />
        <CustomTextInput
          label="Correo"
          icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
          value={userData.email}
          onChangeText={(value) => setUserData({ ...userData, email: value })} // Actualizar el estado cuando el texto cambia
        />
        <CustomTextInput
          label="Correo Visible"
          icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
          value={userData.visibleEmail}
          onChangeText={(value) => setUserData({ ...userData, visibleEmail: value })} // Actualizar el estado cuando el texto cambia
        />
      </View>

      <View style={{
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100,
      }}>

        <CustomButton
          style={styles.buttons}
          title={I18n.t('changePasword')}
          onPress={() => handleChangePasword()}
        />

        <CustomButton
          style={styles.buttons}
          title={I18n.t('saveChanges')}
          onPress={() => pressHandler()}
        />

        <CustomButton
          style={styles.buttons}
          title={I18n.t('delete')}
          onPress={openDeleteCustomModal}
        />

      </View>

      <DeleteCustomModal visible={deleteCustomModalVisible} onClose={closeDeleteCustomModal} />

      {/* <View style={{
        marginTop: 50,
        alignSelf: 'center'
      }}>
        No hace nada el Switch, pero tampoco esta hecho el modo oscuro
        <Switch value='light mode' color='#000000' />
      </View> */}

    </ScrollView>
  );
};


const styles = StyleSheet.create({

  shadow: {
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageStyle: {
    height: 40,
    width: 40,
    padding: 6
  },
  buttons: {
    marginTop: 20,
    marginBottom: 20
  }
});

export default SettingsUser;