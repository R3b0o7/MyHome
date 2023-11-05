import React, { useState } from "react";
import { StyleSheet, View , ScrollView } from "react-native";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import NavigatorConstant from "../../../../navigation/NavigatorConstant";
import { SERVER_URL } from '../../../../config/config';


const ChangePaswordScreen = () => {

  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    currentPassword: '', // contraseña actual
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePasword = async () => {
    // Validar contraseñas
    if (userData.newPassword !== userData.confirmPassword) {
      alert('Las contraseña nueva no coinciden');
      return; // Detener el proceso de registro
    }

    try {

      const token = await AsyncStorage.getItem('authToken');

      const response = await axios.put(`${SERVER_URL}/api/users/passwordChanges`, {

        oldPassword: userData.currentPassword,
        newPassword: userData.newPassword,
      }, {
        headers: {
          Authorization: token,
        },

      });

      // Manejar la respuesta del servidor
      if (response.status === 201) {

        alert('Contraseña cambiada con éxito, Inicie sesion nuevamente');
        navigation.goBack();

      }
    } catch (error) {
      // Manejar errores de red u otros errores
      alert('Error en el cambio de contraseña');
    }
  };

  return (
    <ScrollView>
    <View style={{ marginTop: 200 }}>
      <CustomTextInput
        label={I18n.t('currentPassword')}
        secureTextEntry={true}
        icon={require('../../../../assets/images/Icons/lightMode/key.png')}
        value={userData.currentPassword}
        onChangeText={(text) => setUserData({ ...userData, currentPassword: text })}
      />
      <CustomTextInput
        label={I18n.t('newPassword')}
        secureTextEntry={true}
        icon={require('../../../../assets/images/Icons/lightMode/key.png')}
        value={userData.newPassword}
        onChangeText={(text) => setUserData({ ...userData, newPassword: text })}
      />
      <CustomTextInput
        label={I18n.t('confirmPassword')}
        secureTextEntry={true}
        icon={require('../../../../assets/images/Icons/lightMode/key.png')}
        value={userData.confirmPassword}
        onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })}
      />
      <CustomButton
        style={styles.buttons}
        title={I18n.t('confirm')}
        onPress={() => handleChangePasword()}
      />

    </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 100,
    marginBottom: 20,
    marginLeft: 80,
    marginRight: 80
  }
});

export default ChangePaswordScreen;
