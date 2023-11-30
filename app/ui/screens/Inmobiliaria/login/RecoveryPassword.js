import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import I18n from '../../../../assets/strings/I18';
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL } from '../../../../config/config';
import axios from 'axios';

const ReCoveryScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico


    // Función para manejar la acción de recuperación de contraseña
    const handleRescoveryPassword = async () => {
        try {
            
            if (email.trim() === '') {
                // Validación simple para asegurarse de que se haya ingresado un correo electrónico
                alert('Por favor, ingrese su correo electrónico.');
                return;
            }

            // Realiza la solicitud al servidor con el correo electrónico ingresado
            const response = await axios.post(`${SERVER_URL}/api/users/recovery-request`, { email: email });
            
            if (response.status === 200) {
                // Si la solicitud se completó con éxito, muestra un mensaje al usuario
                alert('Se ha enviado un correo a tu dirección de correo. Por favor, revísalo.');
                navigation.goBack();
            } else {
                // Maneja otros escenarios de respuesta aquí, por ejemplo, si el correo no existe
                alert('Hubo un problema al enviar el correo de recuperación.');
            }
        } catch (error) {
            // Maneja errores de red u otros errores
            alert('Error en la solicitud de recuperación de contraseña');
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.componentsContainer}>
            <CustomTextInput
                    label={I18n.t('mail')}
                    icon={require('../../../../assets/images/Icons/black/email.png')}
                    value={email}
                    onChangeText={(text) => setEmail(text)} // Actualiza el estado del correo electrónico
                />
                <CustomButton title={I18n.t('recoveryPasswordButton')} color="green" onPress={handleRescoveryPassword} style={styles.rescoveryPasswordButton} />
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
    rescoveryPasswordButton: {
        width: 200,
        marginTop: 180,
    },

});


export default ReCoveryScreen;