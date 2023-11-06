import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

const RegisterScreen = () => {
    const navigation = useNavigation();
    
    const [userData, setUserData] = useState({
        userName: '',
        email: '',
        visibleEmail: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegister = async () => {
        // Validar contraseñas
        if (userData.password !== userData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return; // Detener el proceso de registro
        }

        try {
            // Realizar la solicitud de registro al backend
            const response = await axios.post(`${SERVER_URL}/api/users/register`, {
                userName: userData.userName,
                email: userData.email,
                visibleEmail: userData.visibleEmail,
                password: userData.password,
              });
              

            // Manejar la respuesta del servidor
            if (response.status === 201) {
                alert('Registro exitoso, revise su correo para activar la cuenta');
                navigation.goBack(); // Redirigir al usuario a la pantalla de inicio de sesión u otra pantalla.
            } else {
                // Manejar otros escenarios de respuesta (por ejemplo, error de servidor)
                alert('Error en el registro');
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error en el registro:', error);
            alert('Error en el registro');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.componentsContainer}>
                <CustomTextInput
                    label={I18n.t('userName')}
                    icon={require('../../../../assets/images/Icons/black/perfil.png')}
                    value={userData.userName}
                    onChangeText={(text) => setUserData({ ...userData, userName: text })}
                />
                <CustomTextInput
                    label={I18n.t('mail')}
                    icon={require('../../../../assets/images/Icons/black/email.png')}
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <CustomTextInput
                    label={I18n.t('visibleMail')}
                    icon={require('../../../../assets/images/Icons/black/email.png')}
                    value={userData.visibleEmail}
                    onChangeText={(text) => setUserData({ ...userData, visibleEmail: text })}
                />
                <CustomTextInput
                    label={I18n.t('password')}
                    secureTextEntry={true}
                    icon={require('../../../../assets/images/Icons/black/key.png')}
                    value={userData.password}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                />
                <CustomTextInput
                    label={I18n.t('confirmPassword')}
                    secureTextEntry={true}
                    icon={require('../../../../assets/images/Icons/black/key.png')}
                    value={userData.confirmPassword}
                    onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })}
                />
                <CustomButton title={I18n.t('register')} color="green" onPress={handleRegister} style={styles.registerButton} />
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
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButton: {
        marginTop: 100,
    },
});

export default RegisterScreen;
