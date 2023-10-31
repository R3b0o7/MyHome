import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import I18n from '../../../../assets/strings/I18';
import CustomTextInput from '../../../components/CustomTextInput';
import ImageCustomButton from '../../../components/ImageCustomButton';
import Stars from '../../../components/Stars';

import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const ProfileScreen = () => {

    const navigation = useNavigation();

    const handleLogOut = () => {
      navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN)
    };

    const handleSettings = () => {
      navigation.push(NavigatorConstant.PROFILE_STACK.SETTINGS);
    };

    const handleComents = () => {
      navigation.push(NavigatorConstant.PROFILE_STACK.COMENTS);
    };

    const pressHandler = () => {
        Alert.alert("Cerrar Sesión", "Estás seguro que desas cerrar la sesión?",[
            {text: "Sí", onPress: ()=> handleLogOut()},
            {text: "No"}
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

      <View style={{ marginTop: 10}}>
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
          onPress={handleSettings}/>
        <ImageCustomButton 
          style={styles.buttons} 
          title={I18n.t('closeSesion')} 
          imageSource={require('../../../../assets/images/Icons/lightMode/cancel.png')}
          onPress={()=> pressHandler()} />
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    height:50,
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
