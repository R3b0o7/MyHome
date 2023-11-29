import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const CalificationInmobiliaria2 = () => {
    
    const navigation = useNavigation();

    const handleSave = async () => {

        //volver al principio

       
    };

    
    return (
        <View>
           <Text> PLANILLA DE CALIFICACION</Text>
           <CustomButton title='GUARDAR' color="blue" onPress={handleSave} style={styles.loginButton} />

        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default CalificationInmobiliaria2;