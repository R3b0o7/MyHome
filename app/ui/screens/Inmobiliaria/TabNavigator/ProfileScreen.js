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
import RatingStars from '../../../components/RatingStars';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    visibleEmail: '',
    photo: '',
    id: '',
    calificacion: 0,
  });

  const fetchUserData = async () => {
    try {
      // Obtiene el token de AsyncStorage
      const token = await AsyncStorage.getItem('authToken');

      // Realiza una solicitud GET para obtener los datos del usuario desde tu backend
      const response = await axios.get(`${SERVER_URL}/api/users/me`, {
        headers: {
          'Authorization': token,
        },
      });

      if (response.status === 200) {
        const userDataFromAPI = response.data;
        setUserData({
          userName: userDataFromAPI.userName,
          email: userDataFromAPI.email,
          visibleEmail: userDataFromAPI.visibleEmail,
          photo: userDataFromAPI.photo,
          id: userDataFromAPI._id,
          calificacion: userDataFromAPI.calification,
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

  const handleLogOut = () => {
    navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN);
  };

  const handleShifts = () => {
    navigation.push(NavigatorConstant.PROFILE_STACK.SHIFTS);
  };

  const handleSettings = () => {
    navigation.push(NavigatorConstant.PROFILE_STACK.SETTINGS);
  };

  const handleComents = () => {
    navigation.push(NavigatorConstant.PROFILE_STACK.COMENTS,{
        inmobiliariaId: userData.id
    });
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
        <View style={styles.mainContainter}>
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
          <Text variant="headlineMedium" style={styles.userName}>
            {userData.userName}
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <CustomTextInput
            label="Correo"
            value={userData.email}
            disabled={true}
            icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
          />
          <CustomTextInput
            label="Correo Visible"
            value={userData.visibleEmail}
            disabled={true}
            icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
          />
        </View>

        <View style={styles.starsComponent}>
          <RatingStars 
            rating={userData.calificacion} 
            starIconFilled={styles.starIconFilled}
            starIcon={styles.starIcon}
            />
        </View>

        <View style={styles.buttonsContainer}>
          <ImageCustomButton
            style={styles.buttons}
            title={I18n.t('comments')}
            imageSource={require('../../../../assets/images/Icons/lightMode/message.png')}
            onPress={handleComents} />
          <ImageCustomButton
            style={styles.buttons}
            title={I18n.t('shifts')}
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
  mainContainter: {
    felex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingTop: 20,
  },
  buttonsContainer:{
    padding: 10,
  },
  userName: {
    alignSelf: 'center',
    paddingTop: 15,
  },
  starsComponent:{
    alignSelf: 'center',
  },
  starIconFilled: {
    color: 'gold',
    fontSize: 40,
    marginLeft: 2,
  },
  starIcon: {
    color: 'gray',
    fontSize: 40,
    marginLeft: 2,
  },
  buttons: {
    alignSelf: 'center',
    width: '75%',
    height: 40,
    marginTop: 25
  },
  shadow: {
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});

export default ProfileScreen;
