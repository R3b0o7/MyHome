import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import ImageCustomButton from '../../../components/ImageCustomButton';


const LoginUserScreen = () => {
    
    const navigation = useNavigation();

    const handleLogin = async () => {

        navigation.replace(NavigatorConstant.TAB_STACK_USER.TAB);

       
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
    loginButton:{
        alignItems: 'center',
        height: 50,
        marginTop: 40,
        marginBottom:10,
        width: 310
    },
    ButtonImage: {
        height: 42,
        width: 42,
        marginLeft: -5
    }
});

export default LoginUserScreen;
