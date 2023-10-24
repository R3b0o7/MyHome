import React from 'react';
import { View, Text, StyleSheet} from "react-native";
import CustomTextInput from '../../../components/CustomTextInput';

const ProfileScreen = () => {
    return (
        <View style={{marginTop:299}}>

            <CustomTextInput 
                label="Correo"
                icon={require('../../../../assets/images/Icons/message.png')}
            />
            <CustomTextInput 
                label="Correo Visible"
                disabled="true"
            />

        </View>
    ); 
};

const styles = StyleSheet.create({});

export default ProfileScreen;