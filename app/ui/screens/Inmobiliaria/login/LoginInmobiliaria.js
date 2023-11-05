import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        email: '', // Nombre de usuario
        password: '',
    });

    // Función vacía para manejar la acción de inicio de sesión
    const handleLogin = async () => {

        try {
            // Realizar la solicitud de inicio de sesión al servidor
            const response = await axios.post(`${SERVER_URL}/api/users/login`, userData);
            if(response.status === 401){
                alert('La cuenta no está activada, revisa tu correo');

            }

            if (response.status === 200) {
                // Almacenar el token de autenticación en el dispositivo
                const token = response.data.token; // Asumiendo que el servidor envía un token
                await AsyncStorage.setItem('authToken', token); // Almacena el token en AsyncStorage

                // Redirigir al usuario a la pantalla de inicio o a donde sea necesario
                navigation.replace(NavigatorConstant.LANDING_STACK.HOME);
            } else {
                // Manejar otros escenarios de respuesta (por ejemplo, credenciales inválidas)
                alert('Credenciales inválidas');
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            alert('Error en el inicio de sesión, recuerda activar tu cuenta en el link que te llego a tu correo');


        }
    };

    // Función vacía para manejar la acción de registro
    const handleRegister = () => {
        navigation.push(NavigatorConstant.LOGIN_STACK.REGISTER);
    };

    // Función vacía para manejar la acción de recuperación de contraseña
    const handlePasswordRecovery = () => {
        navigation.push(NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image
                    source={require('../../../../assets/images/backgrounds/fondoLogin.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.componentsContainer}>
                <CustomTextInput
                    label={I18n.t('mail')}
                    icon={require('../../../../assets/images/Icons/black/perfil.png')}
                    style={styles.customTextInput}
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <CustomTextInput
                    label={I18n.t('password')}
                    secureTextEntry={true}
                    icon={require('../../../../assets/images/Icons/black/key.png')}
                    value={userData.password}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                />
                <CustomButton title={I18n.t('ingresar')} color="blue" onPress={handleLogin} style={styles.loginButton} />
                <CustomButton title={I18n.t('registrarse')} color="green" onPress={handleRegister} />
                <CustomButton title={I18n.t('recoveryPasswordButton')} color="gray" onPress={handlePasswordRecovery} style={styles.passwordRecoveryButton} />
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
    topContainer: {
        flex: 1.5, // Este contenedor ocupará la mitad superior de la pantalla
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // Agregar estilos necesarios para el contenedor superior aquí
    },
    componentsContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'flex-start', // Cambiar a 'flex-start' para reducir la distancia
        alignItems: 'center',
        paddingTop: 20, // Ajustar el valor según tu preferencia
    },
    loginButton: {
        marginBottom: 45, // Establece la distancia solo para el botón "Ingresar"
        marginTop: 30,
    },
    passwordRecoveryButton: {
        marginTop: 23, // Establece la distancia solo para el botón "Recuperar Contraseña"
    },
    passwordRecoveryButton: {
        marginTop: 23, // Establece la distancia solo para el botón "Recuperar Contraseña"
    },
    image: {
        width: '100%', // Ancho al 100% de la pantalla
        height: '100%', // Alto al 100% de la pantalla
    },
});

export default LoginScreen;
