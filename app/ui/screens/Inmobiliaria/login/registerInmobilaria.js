import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../../../components/customButton';
import CustomTextInput from '../../../components/customTextInput';
import { useNavigation } from '@react-navigation/native';
import I18n from '../../../../assets/strings/I18';


const RegisterScreen = () => {

    const navigation = useNavigation();

    // Función vacía para manejar la acción de registro
    const handleRegister = () => {

        alert('Registro exitoso');
        navigation.goBack();

    };

    return (
        <View style={styles.container}>

            <View style={styles.componentsContainer}>
                <CustomTextInput label={I18n.t('userName')} icon={require('../../../../assets/images/Icons/message.png')} />
                <CustomTextInput label={I18n.t('mail')} icon={require('../../../../assets/images/Icons/message.png')}/>
                <CustomTextInput label={I18n.t('visibleMail')} icon={require('../../../../assets/images/Icons/message.png')} />
                <CustomTextInput label={I18n.t('password')} secureTextEntry={true} icon={require('../../../../assets/images/Icons/message.png')} />
                <CustomTextInput label={I18n.t('confirmPassword')} secureTextEntry={true} icon={require('../../../../assets/images/Icons/message.png')}/>
                <CustomButton title="Registrarse" color="green" onPress={handleRegister} style={styles.registerButton} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    componentsContainer: {
        flex: 2, // Este contenedor ocupará la mitad inferior de la pantalla
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButton: {
        marginTop: 100,
    },

});

export default RegisterScreen;