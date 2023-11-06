import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const ReservePropertie = () => {
    
    const navigation = useNavigation();

    const handlePay = async () => {

        navigation.replace(NavigatorConstant.SEARCH_.PAY_RESERVE);

       
    };
    const handleCancel = async () => {

        navigation.goBack();
       
    };

    
    return (
        <View>
           <Text> PLANILLA DE RESERVA</Text>
           <CustomButton title='PAGAR' color="blue" onPress={handlePay} style={styles.loginButton} />
           <CustomButton title='CANCELAR' color="blue" onPress={handleCancel} style={styles.loginButton} />

        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ReservePropertie;