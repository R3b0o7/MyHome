import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';

const LoginScreen = () => {
    const navigation = useNavigation();

    // Función vacía para manejar la acción de inicio de sesión
    const handleLogin = () => {
        navigation.replace(NavigatorConstant.LANDING_STACK.HOME)
    };

    // Función vacía para manejar la acción de registro
    const handleRegister = () => {
        navigation.push(NavigatorConstant.NAVIGATOR.START);
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
                <CustomTextInput label={I18n.t('userEmail')}  icon={require('../../../../assets/images/Icons/black/perfil.png')}style={styles.customTextInput}/>
                <CustomTextInput label={I18n.t('password')} secureTextEntry={true} icon={require('../../../../assets/images/Icons/black/key.png')}/>
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
