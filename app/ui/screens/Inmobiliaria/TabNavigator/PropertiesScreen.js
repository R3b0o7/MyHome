import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import I18n from '../../../../assets/strings/I18';
import { useNavigation } from '@react-navigation/native';
import { Text, Title } from 'react-native-paper';
import HorizontalCustomCard from '../../../components/HorizontalCustomCard';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

const PropertiesScreen = () => {
    const navigation = useNavigation();

    const [userProperties, setUserProperties] = useState([]); // Estado para almacenar las propiedades del usuario

    const fetchUserProperties = async () => {
        // Obtén el token de AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');

        // Realiza una solicitud GET para obtener las propiedades del usuario
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
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Este código se ejecutará cada vez que la pantalla esté en primer plano
            fetchUserProperties();
        });

        return unsubscribe;
    }, [navigation]);

    const handleToRegister = () => {
        navigation.push(NavigatorConstant.PROPERTIES_STACK.TOREGISTER); // Navega a la pantalla de crear propiedad
    };

    const handleCardHorizontalPress = (propertyId) => {
        // Navega a la pantalla 'Detalle' y pasa el ID de la propiedad como parámetro
        navigation.push(NavigatorConstant.PROPERTIES_STACK.PROPPERTIES_VIEW, {
            propertyId: propertyId,
        });
    };

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
            <View style={styles.upperContainer}>
                <Title style={styles.title}>{I18n.t('myProperties')}</Title>
                <ScrollView>
                    {userProperties.length === 0 ? (
                        <Text style={styles.noPropertiesText}>
                            {I18n.t('noPropertiesCreated')}
                        </Text>
                    ) : (
                        userProperties.map((data, index) => (
                            <HorizontalCustomCard
                                key={index}
                                address={data.calle + ' ' + data.numero + ' ' + data.piso + ' ' + data.departamento}
                                operation={
                                    data.alquiler
                                        ? 'Alquiler'
                                        : data.venta
                                        ? 'Venta'
                                        : data.reservada
                                        ? 'Reservada'
                                        : data.alquiladaVendida
                                        ? 'Alquilada o Vendida'
                                        : '' // Añade una operación predeterminada si ninguna está en true
                                }
                                coverUrl={getRandomImageUrl(data.photos)}
                                onPress={() => handleCardHorizontalPress(data._id)} // Pasa el ID de la propiedad al presionar
                            />
                        ))
                    )}
                </ScrollView>
            </View>
            <View style={styles.lowerContainer}>
                {/* Contenedor inferior (1/4 de la pantalla) */}
                <CustomButton
                    style={styles.button}
                    title={I18n.t('toRegister')}
                    onPress={handleToRegister}
                />
            </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        marginTop: 20,
    },
    upperContainer: {
        flex: 3, // Este contenedor ocupará 3/4 de la pantalla
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // Puedes agregar estilos adicionales según tus necesidades
    },
    lowerContainer: {
        flex: 0.5, // Este contenedor ocupará 1/4 de la pantalla
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        width: 200
    },
});

export default PropertiesScreen;
