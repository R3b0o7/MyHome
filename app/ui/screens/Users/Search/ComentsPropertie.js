import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const ComentsPropertie = () => {
    
    const navigation = useNavigation();

    const handleLogin = async () => {

        navigation.replace(NavigatorConstant.TAB_STACK_USER.TAB);

       
    };

    
    return (
        <View>
           <Text> RESULTADO DE PROPIEDADES</Text>
           <CustomButton title={I18n.t('')} color="blue" onPress={handleLogin} style={styles.loginButton} />

        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ComentsPropertie;