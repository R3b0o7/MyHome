import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import I18n from '../../../../assets/strings/I18';
import CustomTextInput from '../../../components/CustomTextInput';
import ImageCustomButton from '../../../components/ImageCustomButton';
import Stars from '../../../components/Stars';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const ProfileScreen = () => {
  const navigation = useNavigation();
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

  const handleLogOut = () => {
    navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN);
  };

  const handleSettings = () => {
    navigation.push(NavigatorConstant.PROFILE_STACK.SETTINGS);
  };

  const handleComents = () => {
    navigation.push(NavigatorConstant.PROFILE_STACK.COMENTS);
  };

  const pressHandler = () => {
    Alert.alert("Cerrar Sesión", "Estás seguro que desas cerrar la sesión?", [
      { text: "Sí", onPress: () => handleLogOut() },
      { text: "No" }
    ])
  }

  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 39, alignSelf: 'center' }}>
          <Avatar.Image
            style={styles.shadow}
            size={200}
            source={require('../../../../assets/images/misc/logotipo.png')}
          />
          <Text variant="headlineMedium" style={{ marginTop: 20 }}>
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

        <View style={{ marginTop: 10 }}>
          <Stars />
        </View>

        <View style={{
          marginTop: 15,
          marginLeft: 45,
          marginRight: 45,
        }}>
          <ImageCustomButton
            style={styles.buttons}
            title={I18n.t('comments')}
            imageSource={require('../../../../assets/images/Icons/lightMode/message.png')}
            onPress={handleComents} />
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
  buttons: {
    height: 50,
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
