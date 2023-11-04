import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';

const ChangePaswordScreen = () => {
    
    const [userData, setUserData] = useState({
        email: '', // Nombre de usuario
        password: '',
    });

    const handleValidate = async () => {

    }

  return (
    <View style={{marginTop: 200}}>
        <CustomTextInput
          label="Contraseña actual"
          icon={require('../../../../assets/images/Icons/lightMode/key.png')}
        //   value={userData.visibleEmail}
        //   onChangeText={(value) => setUserData({ ...userData, visibleEmail: value })} // Actualizar el estado cuando el texto cambia
        />
        <CustomTextInput
          label="Contraseña nueva"
          icon={require('../../../../assets/images/Icons/lightMode/key.png')}
        //   value={userData.visibleEmail}
        //   onChangeText={(value) => setUserData({ ...userData, visibleEmail: value })} // Actualizar el estado cuando el texto cambia
        />
        <CustomButton
          style={styles.buttons} 
          title={I18n.t('confirm')}
        //   onPress={() => handleChangePasword()}
        />

    </View>
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
