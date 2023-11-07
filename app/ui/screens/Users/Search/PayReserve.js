import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const PayReserve = () => {
    
    const navigation = useNavigation();

    const handleRate = async () => {

        navigation.push(NavigatorConstant.SEARCH_.CALIFICATION_INM);

       
    };

    const handleRateLater = async () => {

         //volver al principio

       
    };

    
    return (
        <View>
           <Text> COMPROBANTE DE PAGO FAKE</Text>
           <CustomButton title='CALIFICAR AHORA' color="blue" onPress={handleRate} style={styles.loginButton} />
           <CustomButton title='CALIFICAR LUEGO' color="blue" onPress={handleRateLater} style={styles.loginButton} />

        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default PayReserve;