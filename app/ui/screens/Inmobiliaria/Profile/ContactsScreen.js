import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ContactsScreen = () => {


    const navigation = useNavigation();

    const [userContacts, setUserContacts] = useState([{
        message: 'Test Message',
        mañana: false,
        tarde: true,
        date: '12/12/2023',
        property: 'Callao 2000',
        user:'Matias Gomila',
      ]); // Estado para almacenar los turnos del usuario
/*
    const fetchUserContacts = async () => {
        // Obtén el token de AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');

        // Realiza una solicitud GET para obtener las propiedades del usuario
        try {
            const response = await axios.get(`${SERVER_URL}/api/contact/getContactsByInmobiliaria`, {
                headers: {
                    Authorization: authToken,
                }
            });
            if (response.status === 200) {
                setUserContacts(response.data);
            }
        } catch (error) {
            console.error('Error al obtener los turnos del usuario:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Este código se ejecutará cada vez que la pantalla esté en primer plano
            fetchUserContacts();
        });

        return unsubscribe;
    }, [navigation]); */

    //Crear noContactsCreated style

    const handleCardHorizontalPress = (propertyId) => {
        //Manejarlo
    };

    //Acordarse de borrar
    const getRandomImageUrl = (images) => {
        if (!Array.isArray(images) || images.length === 0) {
            // Devuelve una URL predeterminada o null
            return 'https://picsum.photos/701'; // O alguna otra URL de imagen predeterminada
        }
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>{I18n.t('myContacts')}</Title>
            <ScrollView>
                {userContacts.length === 0 ? (
                    <Text style={styles.noContactsCreated}>
                        {I18n.t('noContactsCreated')}
                    </Text>
                ) : (
                    userContacts.map((data, index) => ( //Buscar como tomar los datos de la property
                        <HorizontalCustomCard
                            key={index}
                            address={data.calle + ' ' + data.numero + ' ' + data.piso + ' ' + data.departamento}
                            username={data.username} //Tomar nombre del usuario en una constante arriba
                            date={data.date}
                            time={
                                data.mañana
                                    ? 'Mañana'
                                    : data.tarde
                                    ? 'Tarde'
                                    : '' // Añade una operación predeterminada si ninguna está en true
                            }
                            onPress={() => handleCardHorizontalPress('a')}
                            coverUrl={getRandomImageUrl(data.photos)} //poner url de verdad
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 13,
        marginTop: 50,
    },
});

export default ContactsScreen;