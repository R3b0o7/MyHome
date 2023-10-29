import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import I18n from '../../../../assets/strings/I18';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';

import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const settingsScreen = () => {

    return (
        <View>
          <View style={{ marginTop: 39, alignSelf: 'center' }}>
            <Avatar.Image
              style={styles.shadow}
              size={200}
              source={require('../../../../assets/images/misc/logotipo.png')}
            />
          </View>
    
          <View style={{ marginTop: 10 }}>
            <CustomTextInput
              label="Nombre"
              icon={require('../../../../assets/images/Icons/lightMode/perfil.png')}
            />
            <CustomTextInput
              label="Correo"
              icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
            />
            <CustomTextInput
              label="Correo Visible"
              icon={require('../../../../assets/images/Icons/lightMode/mail.png')}
            />
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

export default settingsScreen;