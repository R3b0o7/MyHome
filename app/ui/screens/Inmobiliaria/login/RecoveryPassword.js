import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import I18n from '../../../../assets/strings/I18';
import { useNavigation } from '@react-navigation/native';

const ReCoveryScreen = () => {
    const navigation = useNavigation();

    // Función vacía para manejar la acción de registro
    const handleRescoveryPassword = () => {
        alert('Se envió un correo a tu mail. Por favor revisalo');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

            <View style={styles.componentsContainer}>
                <CustomTextInput label={I18n.t('userName')} icon={require('../../../../assets/images/Icons/black/perfil.png')}/>
                <CustomTextInput label={I18n.t('mail')} icon={require('../../../../assets/images/Icons/black/email.png')}/>
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
        marginTop: 250,
    },

});

export default ReCoveryScreen;
