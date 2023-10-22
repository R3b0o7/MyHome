import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextInput from '../../components/customTextInput';

const LoginScreen = () => {
    // Función vacía para manejar la acción de inicio de sesión
    const handleLogin = () => {
        // No hace nada por el momento
    };

    // Función vacía para manejar la acción de registro
    const handleRegister = () => {
        // No hace nada por el momento
    };

    // Función vacía para manejar la acción de recuperación de contraseña
    const handlePasswordRecovery = () => {
        // No hace nada por el momento
    };

    return (
        <View style={styles.container}>
            <CustomTextInput placeholder="Usuario" />
            <CustomTextInput placeholder="Contraseña" secureTextEntry={true} />
            <CustomButton title="Ingresar" color="blue" onPress={handleLogin} />
            <CustomButton title="Registrarse" color="green" onPress={handleRegister} />
            <CustomButton title="Recuperar Contraseña" color="gray" onPress={handlePasswordRecovery} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
