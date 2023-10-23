import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextInput from '../../components/customTextInput';
import { useNavigation } from '@react-navigation/native';


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
                <CustomTextInput placeholder="Nombre de usuario" />
                <CustomTextInput placeholder="Correo" />
                <CustomTextInput placeholder="Correo visible" />
                <CustomTextInput placeholder="Contraseña" secureTextEntry={true} />
                <CustomTextInput placeholder="Confirmar contraseña" secureTextEntry={true} />
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