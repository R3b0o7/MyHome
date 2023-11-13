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
import { API_KEY, CLOUD_NAME, API_SECRET } from '@env';
import ImagePicker from 'react-native-image-crop-picker';

const SettingsScreen = () => {

  const navigation = useNavigation();
  const [updateImageModalVisible, setUpdateImageModalVisible] = useState(false);

  const [imageUrls, setImageUrls] = useState([]);

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
    photo: '',
  });

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
              photo: response.data.photo,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSaveChanges = async () => {
    try {
      const token = await getToken();

      // Espera a que la imagen se suba y obtén la URL
      const photoUrl = await uploadImages();

      // Si la imagen se subió correctamente, actualiza los datos del usuario
      if (photoUrl) {
        const response = await axios.put(`${SERVER_URL}/api/users/saveChanges`, {
          userName: userData.userName,
          email: userData.email,
          visibleEmail: userData.visibleEmail,
          photo: photoUrl,
        }, {
          headers: {
            Authorization: token,
          },
        });

        alert('Datos actualizados con éxito');
        navigation.goBack();
      } else {
        console.log('No se pudo subir la imagen');
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
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


  const handleChangePhoto = () => {
    ImagePicker.openPicker({
      multiple: false,
      // ... otras opciones ...
    }).then(image => {
      // Almacenar la información de una única imagen, no un array
      const imageInfo = {
        uri: image.path,
        type: image.mime,
        name: image.filename || `image-${Date.now()}`
      };

      setImageUrls([imageInfo]); // Asegúrate de establecerlo como un array aquí
      setUserData({ ...userData, photo: image.path });
    }).catch(error => {
      console.log('Error al seleccionar imágenes:', error);
    });
  };

  const uploadImages = async () => {
    if (imageUrls.length === 0) {
      console.log("No hay imágenes para subir");
      return null;
    }

    const image = imageUrls[0]; // Toma la primera imagen
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.name,
    });
    formData.append('upload_preset', 'Fotos_Perfil');

    try {
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return uploadResponse.data.secure_url; // Retorna la URL de la imagen subida
    } catch (error) {
      console.log('Error al subir la imagen:', error);
      throw error;
    }
  };



  return (
    <ScrollView>
      <View style={{ marginTop: 39, alignSelf: 'center' }}>
        {
          userData.photo ?
            <Avatar.Image
              style={styles.shadow}
              size={200}
              source={{ uri: userData.photo }}
            />
            :
            // Puedes poner aquí un avatar predeterminado o dejarlo vacío
            <Avatar.Icon
              style={styles.shadow}
              size={200}
              source={require('../../../../assets/images/misc/logotipo.png')}
              icon="account"
            />
        }
      </View>

      <View style={{
        marginTop: -40,
        marginLeft: 270,
        marginRight: 100
      }}>
        <ImageCustomButton style={styles.imageStyle} onPress={handleChangePhoto} imageSource={require('../../../../assets/images/Icons/pencil.png')} />
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

export default SettingsScreen;