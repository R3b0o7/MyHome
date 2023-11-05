import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import ImageCustomButton from '../../../components/ImageCustomButton';
import ImageCustomButtonBlue from '../../../components/ImageCustomButtonBlue';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';

const LoginLandingScreen = () => {
    const navigation = useNavigation();

    // Función vacía para manejar la acción de login Inmobiliaria
    const handleInmobiliaria = () => {
        navigation.push(NavigatorConstant.LOGIN_STACK.LOGIN);
    };

    // Función vacía para manejar la acción de login Usuario
    const handleUsuario = () => {
       // navigation.push(NavigatorConstant.LOGIN_STACK.LOGIN);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/images/backgrounds/loginLandingBackground.png')} resizeMode="cover" style={styles.image}>   
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/images/Icons/logo.png')}
                />
                <ImageCustomButton 
                    title={I18n.t('usuario')} 
                    imageSource={require('../../../../assets/images/Icons/lightMode/perfil.png')}
                    onPress={handleUsuario}
                    style={styles.buttons} />
                <ImageCustomButtonBlue 
                    title={I18n.t('inmobiliaria')} 
                    imageSource={require('../../../../assets/images/Icons/darckMode/corporate.png')}
                    onPress={handleInmobiliaria}
                    style={styles.buttons} />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        height: 150,
        width: 200,
        marginBottom: 80,
    },
    buttons: {
        height: 50,
        width: 180,
        marginTop: 80,
        alignSelf: 'center',
    },
});

export default LoginLandingScreen;
