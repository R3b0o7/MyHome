import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const ComentsPropertie2 = () => {
    
    const navigation = useNavigation();

    

    
    return (
        <View>
           <Text> COMENTARIOS DE INMOBILIARIA2</Text>
           
        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ComentsPropertie2;