import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Switch  } from 'react-native-paper';

import I18n from '../../../../assets/strings/I18';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';



const SettingsScreen = () => {

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
              marginTop: 80,
              marginLeft: 120,
              marginRight: 120,
          }}>
            <CustomButton style={styles.buttons} title={I18n.t('delete')}/>
          </View>
          
          <View style={{
              marginTop: 50, 
              alignSelf: 'center'}}>
            {/* No hace nada el Switch, pero tampoco esta hecho el modo oscuro*/}
            <Switch value='light mode' color='#000000'/> 
          </View>

        </View>
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
      }
});

export default SettingsScreen;