import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

import I18n from '../../../../assets/strings/I18';
import CustomButton from '../../../components/CustomButton';
import ButtonList from '../../../components/ButtonList';

const SearchPropertie = () => {
    const navigation = useNavigation();

    const [userProperties, setUserProperties] = useState([]); // Estado para almacenar las propiedades del usuario

   /* const fetchUserProperties = async () => {
        // Obtén el token de AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');

        // Realiza una solicitud GET para obtener las propiedades del usuario desde tu backend
        try {
            const response = await axios.get(`${SERVER_URL}/api/properties/user-properties`, {
                headers: {
                    Authorization: authToken,
                }
            });
            if (response.status === 200) {
                setUserProperties(response.data);
            }
        } catch (error) {
            console.error('Error al obtener las propiedades del usuario:', error);
        }
    };*/

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Este código se ejecutará cada vez que la pantalla esté en primer plano
           // fetchUserProperties();
        });
        return unsubscribe;
    }, [navigation]);

    const handleLogin = async () => {
        navigation.push(NavigatorConstant.SEARCH_.RESULTS);
    };
    
    const items = [
        {title: "Venta",},
        {title: "Alquiler",},
      ];

    return (

        <View>
            <Text>PANTALLA DE BUSQUEDA DE PROPIEDADES</Text>
            <CustomButton title='BOTON BUSCAR' color="blue" onPress={handleLogin} style={styles.loginButton} />
            <ButtonList
                title={"Venta/Alquiler"}
                onPress={() => {}}
                items={items}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default SearchPropertie;
