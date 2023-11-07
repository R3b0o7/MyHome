import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const ViewPropertie = () => {
    
    const navigation = useNavigation();

    const handleReserv = async () => {

       
        navigation.push(NavigatorConstant.SEARCH_.RESERVE_PROPERTIES);

       
    };

    const handleContact = async () => {

        navigation.push(NavigatorConstant.SEARCH_.CONTACT_PROPERTIES);

       
    };

    
    return (
        <View>
           <Text> DETALLES DE LA PROPIEDAD</Text>
           <CustomButton title='RESERVAR' color="blue" onPress={handleReserv} style={styles.loginButton} />
           <CustomButton title='CONTACTAR' color="blue" onPress={handleContact} style={styles.loginButton} />

        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ViewPropertie;