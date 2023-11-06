import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const ResultPropertie = () => {
    
    const navigation = useNavigation();

    const handleLogin = async () => {

        navigation.push(NavigatorConstant.SEARCH_.PROPERTIES_USER);

       
    };

    
    return (
        <View>
           <Text> RESULTADO DE PROPIEDADES</Text>
           <CustomButton title='PROPIEDAD' color="blue" onPress={handleLogin} style={styles.loginButton} />

        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ResultPropertie;