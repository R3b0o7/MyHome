import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import I18n from '../../../../assets/strings/I18';
import CustomTextInput from '../../../components/CustomTextInput';
import ImageCustomButton from '../../../components/ImageCustomButton';
import Stars from '../../../components/Stars';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const ProfileUser = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    direccion: '',
    photo: '',
  });

  const fetchUserData = async () => {
    try {
      // Obtiene el token de AsyncStorage
      const token = await AsyncStorage.getItem('authToken');

      // Realiza una solicitud GET para obtener los datos del usuario desde tu backend
      const response = await axios.get(`${SERVER_URL}/api/usersComun/me`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        const userDataFromAPI = response.data;
        setUserData({
          userName: userDataFromAPI.userName,
          email: userDataFromAPI.email,
          direccion: userDataFromAPI.direccion,
          photo: userDataFromAPI.photo,
        });
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  const handleShifts = () => {
    navigation.push(NavigatorConstant.PROFILE_USER_STACK.SHIFTS_USER);
  };

  const handleSettings = () => {
    navigation.push(NavigatorConstant.PROFILE_STACK.SETTINGS);
  };

  const handleLogOut = () => {
    navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN);
  };

  const pressHandler = () => {
    Alert.alert("Cerrar Sesión", "Estás seguro que deseas cerrar la sesión?", [
      { text: "Sí", onPress: () => handleLogOut() },
      { text: "No" }
    ])
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
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
          <Text variant="headlineMedium" style={styles.textName}>
            {userData.userName}
          </Text>
        </View>

        <View style={styles.container}>
          <CustomTextInput
            label={I18n.t('mail')}
            value={userData.email}
            disabled={true}
            icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
          />
          <CustomTextInput
            label={I18n.t('direc')}
            value={userData.direccion}
            disabled={true}
            icon={require('../../../../assets/images/Icons/lightMode/tag.png')}
          />
        </View>

        <View style={styles.buttonsConteiner}>

          <ImageCustomButton
            style={styles.buttons}
            title={I18n.t('myContacts')}
            imageSource={require('../../../../assets/images/Icons/lightMode/calendar.png')}
            onPress={handleShifts} />
          <ImageCustomButton
            style={styles.buttons}
            title={I18n.t('settings')}
            imageSource={require('../../../../assets/images/Icons/lightMode/settings.png')}
            onPress={handleSettings} />            
          <ImageCustomButton
            style={styles.buttons}
            title={I18n.t('closeSesion')}
            imageSource={require('../../../../assets/images/Icons/lightMode/cancel.png')}
            onPress={() => pressHandler()} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',     // Centra horizontalmente
  },
  buttonsConteiner: {
    flex: 2,
    marginTop: 80,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',     // Centra horizontalmente
  },
  buttons: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    width: 300
  },
  shadow: {
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textName: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', // Alinea el texto en el centro horizontal
  }
});

export default ProfileUser;
