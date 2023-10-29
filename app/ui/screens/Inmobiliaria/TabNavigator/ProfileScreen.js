import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import I18n from '../../../../assets/strings/I18';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Stars from '../../../components/Stars';

import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const ProfileScreen = () => {

    const navigation = useNavigation();

    const handleLogin = () => {
      navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN)
    };

    const handleSettings = () => {
      navigation.push(NavigatorConstant.PROFILE_SCREEN.SETTINGS);
    };

    const pressHandler = () => {
        Alert.alert("Cerrar Sesión", "Estás seguro que desas cerrar la sesión?",[
            {text: "Sí", onPress: ()=> handleLogin()},
            {text: "No"}
        ])
    }

  return (
    <View>
      <View style={{ marginTop: 39, alignSelf: 'center' }}>
        <Avatar.Image
          style={styles.shadow}
          size={200}
          source={require('../../../../assets/images/misc/logotipo.png')}
        />
        <Text variant="headlineMedium" style={{ marginTop: 20 }}>
          Basilone Propiedades
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <CustomTextInput
          label="Correo"
          disabled={true}
          icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
        />
        <CustomTextInput
          label="Correo Visible"
          disabled={true}
          icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Stars />
      </View>

      <View style={{
        marginTop: 30,
        marginLeft: 40,
        marginRight: 40,
      }}>
        <CustomButton style={styles.buttons} title={I18n.t('comments')} />
        <CustomButton style={styles.buttons} title={I18n.t('settings')} onPress={handleSettings}/>
        <CustomButton style={styles.buttons} title={I18n.t('closeSesion')} onPress={()=> pressHandler()} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 30
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
