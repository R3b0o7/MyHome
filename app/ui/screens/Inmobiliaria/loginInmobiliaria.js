import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextInput from '../../components/customTextInput';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import I18n from '../../../assets/strings/I18';



const LoginScreen = () => {

    const navigation = useNavigation();

    // Función vacía para manejar la acción de inicio de sesión
    const handleLogin = () => {
        // No hace nada por el momento
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
                    source={require('../../../assets/images/backgrounds/fondoLogin.png')}
                    style={styles.image}
                />

            </View>
            <View style={styles.componentsContainer}>
                <CustomTextInput placeholder="Usuario" />
                <CustomTextInput placeholder="Contraseña" secureTextEntry={true} />
                <CustomButton title="Ingresar" color="blue" onPress={handleLogin} style={styles.loginButton} />
                <CustomButton title="Registrarse" color="green" onPress={handleRegister} />
                <CustomButton title= {I18n.t('recoveryPasswordButton')} color="gray" onPress={handlePasswordRecovery} style={styles.passwordRecoveryButton} />
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
        // Agregar estilos necesarios para el contenedor superior aquí
    },
    componentsContainer: {
        flex: 2, // Este contenedor ocupará la mitad inferior de la pantalla
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        marginBottom: 45, // Establece la distancia solo para el botón "Ingresar"
    },
    passwordRecoveryButton: {
        marginTop: 23, // Establece la distancia solo para el botón "Recuperar Contraseña"
    },
});

export default LoginScreen;
