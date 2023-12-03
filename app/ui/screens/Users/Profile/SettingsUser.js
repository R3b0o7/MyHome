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
import DeleteCustomModal from '../../../components/DeleteCustomModal2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, CLOUD_NAME, API_SECRET } from '@env';
import ImagePicker from 'react-native-image-crop-picker';


const SettingsUser = () => {

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
    direccion: '',
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
        axios.get(`${SERVER_URL}/api/usersComun/me`, {
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            setUserData({
              userName: response.data.userName,
              email: response.data.email,
              direccion: response.data.direccion,
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
        const token = await getToken(); // Espera a obtener el token

        // Inicializa photoUrl como null
        let photoUrl = null;

        // Comprueba si imageUrls tiene algún valor antes de llamar a uploadImages
        if (imageUrls.length > 0) {
            // Si hay una imagen seleccionada, sube esa imagen y obtiene la URL
            photoUrl = await uploadImages();
        } else {
            // Si no hay imagen seleccionada, conserva la URL de la foto actual
            photoUrl = userData.photo;
        }

        // Realizar una solicitud PUT para actualizar los datos del usuario
        await axios.put(`${SERVER_URL}/api/usersComun/saveChanges`, {
            userName: userData.userName,
            email: userData.email,
            direccion: userData.direccion,
            photo: photoUrl, // Usa la URL de la imagen actual o la nueva
        }, {
            headers: {
                Authorization: token,
            },
        });

        Alert.alert('Éxito', 'Datos actualizados con éxito');
        navigation.goBack(); // Regresa a la pantalla anterior
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
        Alert.alert('Error', 'Error al actualizar los datos del usuario');
    }
};


  /* const handleDeleteAccount = () => {
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
  // const pressDeleteAccount = () => {
  //   Alert.alert("BORRAR CUENTA", "Estás seguro que desas BORRAR LA CUENTA?", [
  //     { text: "Sí", onPress: () => handleDeleteAccount() },
  //     { text: "No" }
  //   ])
  // }*/
  
  const pressHandler = () => {
    Alert.alert("Guardar cambios", "Estás seguro que desas guardar cambios?", [
      { text: "Sí", onPress: () => handleSaveChanges() },
      { text: "No" }
    ])
  }

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
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
                icon="account"
              />
          }
          <ImageCustomButton
            style={styles.imageButtonStyle}
            onPress={handleChangePhoto}
            imageSource={require('../../../../assets/images/Icons/pencil.png')}
          />
        </View>

        <UpdateImageModal visible={updateImageModalVisible} onClose={closeUpdateImageModal} />
      </View>

      <View style={styles.container}>
        <CustomTextInput
          label={I18n.t('name')}
          icon={require('../../../../assets/images/Icons/lightMode/perfil.png')}
          value={userData.userName}
          onChangeText={(value) => setUserData({ ...userData, userName: value })} // Actualizar el estado cuando el texto cambia
        />
        <CustomTextInput
          label={I18n.t('mail')}
          icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
          value={userData.email}
          disabled={true}
          onChangeText={(value) => setUserData({ ...userData, email: value })} // Actualizar el estado cuando el texto cambia
        />
        <CustomTextInput
          label={I18n.t('direc')}
          icon={require('../../../../assets/images/Icons/lightMode/tag.png')}
          value={userData.direccion}
          onChangeText={(value) => setUserData({ ...userData, direccion: value })} // Actualizar el estado cuando el texto cambia
        />
      </View>

      <View style={styles.container}>
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
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',     // Centra horizontalmente
  },
  avatarContainer: {
    position: 'relative', // Establecer la posición relativa para posicionar los elementos secundarios
  },
  shadow: {
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageButtonStyle: {
    position: 'absolute', // Posiciona el botón de imagen de forma absoluta con respecto al contenedor principal
    bottom: 0,
    right: 0,
    height: 40,
    width: 40,
    padding: 6
  },
  buttons: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    width: 200
  }
});

export default SettingsUser;