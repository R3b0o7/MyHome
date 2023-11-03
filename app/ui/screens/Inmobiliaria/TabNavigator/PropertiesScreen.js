import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import I18n from '../../../../assets/strings/I18';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import HorizontalCustomCard from '../../../components/HorizontalCustomCard';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

const HomeScreen = () => {
    const navigation = useNavigation();

    const [userProperties, setUserProperties] = useState([]); // Estado para almacenar las propiedades del usuario

    const fetchUserProperties = async () => {
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
    };

    useEffect(() => {
        fetchUserProperties(); // Llama a la función para obtener las propiedades cuando el componente se monta
    }, []);

    const handleToRegister = () => {
        navigation.push(NavigatorConstant.PROPERTIES_STACK.TOREGISTER); // Navega a la pantalla de crear propiedad
    };

    const handleCardHorizontalPress = () => {
        navigation.push(NavigatorConstant.PROPERTIES_STACK.PROPPERTIES_VIEW); // Navega a la pantalla 'Detalle'
    };

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Title style={styles.title}>{I18n.t('myProperties')}</Title>
                <ScrollView>
                    {userProperties.map((data, index) => (
                        <HorizontalCustomCard
                            key={index}
                            address={data.address}
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
                            coverUrl={data.coverUrl}
                            onPress={handleCardHorizontalPress}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.lowerContainer}>
                {/* Contenedor inferior (1/4 de la pantalla) */}
                <CustomButton
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
});

export default HomeScreen;
