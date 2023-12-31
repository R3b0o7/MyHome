import React from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import ImageCustomButton from '../../../components/ImageCustomButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLIENT_GOOGLE } from '@env';


const LoginUserScreen = () => {

    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: "704405752710-n2tgvrt5aoepu5b5d7mpqccmjj4perlf.apps.googleusercontent.com",
        offlineAccess: true // Si necesitas acceder al token de actualización
    });

    const handleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            // Cierra la sesión actual antes de iniciar una nueva
            await GoogleSignin.signOut();

            const userInfo = await GoogleSignin.signIn();

            const userData = {
                userName: userInfo.user.name,
                email: userInfo.user.email,
                direccion: '',
                photo: userInfo.user.photo
            }

            // Realizar la solicitud de inicio de sesión al servidor
            const response = await axios.post(`${SERVER_URL}/api/usersComun/login`, userData);

            if (response.status === 200) {
                
                // Almacenar el token de autenticación en el dispositivo
                const token = response.data.token; // Asumiendo que el servidor envía un token
                await AsyncStorage.setItem('authToken', token); // Almacena el token en AsyncStorage

                // Redirigir al usuario a la pantalla de inicio o a donde sea necesario
                navigation.replace(NavigatorConstant.TAB_STACK_USER.TAB);
            }
            
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un estado fuera del rango 2xx
                const errorMessage = error.response.data.message;
                alert(errorMessage);
            } else if (error.message === "Network Error") {
                // Manejo de errores de red, como la ausencia de conexión a Internet
                alert('No hay conexión a Internet. Por favor, verifica tu conexión.');
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                alert('No se recibió respuesta del servidor');
            }  else {
                // Algo ocurrió al configurar la solicitud que desencadenó un error
                alert('Error al realizar la solicitud');
            }
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image
                    source={require('../../../../assets/images/backgrounds/userBackground.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.componentsContainer}>
                <ImageCustomButton
                    style={styles.loginButton}
                    imageStyle={styles.ButtonImage}
                    title={I18n.t('logGoogle')}
                    imageSource={require('../../../../assets/images/Icons/google.png')}
                    onPress={handleLogin}
                />
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
        flex: 1, // Este contenedor ocupará la mitad superior de la pantalla
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    componentsContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    loginButton: {
        alignItems: 'center',
        height: 50,
        marginTop: 40,
        marginBottom: 10,
        width: 310
    },
    ButtonImage: {
        height: 42,
        width: 42,
        marginLeft: -5
    }
});

export default LoginUserScreen;
