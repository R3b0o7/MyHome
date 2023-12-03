import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import CustomCard from '../../../components/CustomCard';
import I18n from '../../../../assets/strings/I18';
import { useNavigation } from '@react-navigation/native';
import { Text, Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import HorizontalCustomCard from '../../../components/HorizontalCustomCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';

const HomeScreen = () => {
    const navigation = useNavigation();

    const [userProperties, setUserProperties] = useState([]); // Estado para almacenar las propiedades del usuario
    const [userPropertiesFavorites, setUserPropertiesFavorites] = useState([]);

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
    const fetchFavoritesProperties = async () => {
        try {
            // Obtener el token de autenticación del usuario
            const token = await AsyncStorage.getItem('authToken');

            // Si no hay token, no proceder
            if (!token) {
                console.error('No se encontró el token de autenticación');
                return;
            }

            // Configuración para la solicitud axios (headers con token)
            const config = {
                headers: { Authorization: token }
            };

            // Hacer la solicitud GET al endpoint de favoritos
            const response = await axios.get(`${SERVER_URL}/api/users/favorites`, config);

            if (response.status === 200) {
                // Aquí puedes actualizar un estado con las propiedades favoritas, o hacer lo que necesites con estos datos
                setUserPropertiesFavorites(response.data.properties);

            } else {
                console.error('Error al obtener propiedades favoritas:', response.data.message);
            }
        } catch (error) {
            console.error('Error al obtener propiedades favoritas:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Este código se ejecutará cada vez que la pantalla esté en primer plano
            fetchUserProperties();
            fetchFavoritesProperties();
        });

        return unsubscribe;
    }, [navigation]);


    const handleCardHorizontalPress = () => {
        // Define aquí la lógica de navegación

        //navigation.push(NavigatorConstant.LOGIN_STACK.REGISTER); // Navega a la pantalla 'Detalle'

    };

    const handleCardPress = (propertyId) => {
        navigation.push(NavigatorConstant.HOME_STACK.PROPERTIE_INM, {
            propertyId,

        });

    };




    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <CustomCard
                    key={index}
                    address={item.calle + ' ' + item.numero}
                    description={
                        (item.alquiler ? 'Alquiler' :
                            item.venta ? 'Venta' :
                                item.reservada ? 'Reservada' :
                                    item.alquiladaVendida ? 'Alquilada o Vendida' : '')
                        + ' - ' + item.localidad // Aquí puedes añadir tu texto
                    }
                    coverUrl={getRandomImageUrl(item.photos)}
                    CustomButtonTitle={I18n.t('view')}
                    onCustomButtonPress={() => handleCardPress(item._id)} // Pasa la función personalizada
                />
            </View>
        );
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

        <ScrollView>
            <View style={styles.headerContainer}>
                <Image source={require('../../../../assets/images/Icons/destacadas.png')} style={{ width: 20, height: 24, marginRight: 8, }} />
                <Title style={styles.title}>Mis destacadas</Title>
            </View>
            {
                userPropertiesFavorites.length > 0
                    ? (
                        <View style={styles.carouselContainer}>
                            <Carousel
                                data={userPropertiesFavorites}
                                renderItem={renderItem}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={250} // Ancho de cada tarjeta en el carrusel
                            />
                        </View>
                    )
                    : <Text style={styles.noPropertiesText}>
                        No tienes propiedades favoritas.
                    </Text>
            }

            <View style={styles.headerContainer}>
                <Image source={require('../../../../assets/images/Icons/propiedades.png')} style={styles.icon} />
                <Title style={styles.title}>Propiedades reservadas</Title>
            </View>
            <View style={styles.cardsContainer}>

                {userProperties
                    .filter((data) => data.reservada)
                    .map((data, index) => (
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
                }
                {userProperties.filter((data) => data.reservada).length === 0 && (
                    <Text style={styles.noPropertiesText}>
                        No tienes propiedades reservadas.
                    </Text>
                )}


            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    carouselContainer: {
        flex: 1.5,
        alignItems: 'center',
    },
    cardsContainer: {
        flex: 1, // Ocupa el espacio inferior
        justifyContent: 'flex-end', // Alinea el botón en la parte inferior
        alignItems: 'center', // Alinea elementos secundarios en el centro
    },
    headerContainer: {
        marginLeft: 31,
        flexDirection: 'row',
        alignItems: 'center',
    },
    noPropertiesText:{
        alignSelf:'center'
    },
    icon: {
        width: 24, // Set the desired width for your icon
        height: 24, // Set the desired height for your icon
        marginRight: 8, // Adjust the spacing as needed
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
    },
    title2: {
        fontSize: 20,
        marginVertical: 10,
        marginTop: 10,
    },
    recoveryPasswordButton: {
        marginTop: 20,
    },
    slide: {
        // Estilos específicos para cada tarjeta en el carrusel
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 3,
        marginBottom: 5
    },
});

export default HomeScreen;
