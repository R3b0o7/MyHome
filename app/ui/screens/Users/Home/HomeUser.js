import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image, PermissionsAndroid, Platform } from 'react-native';
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
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';

const HomeUser = () => {
    const navigation = useNavigation();

    const [userProperties, setUserProperties] = useState([]); // Estado para almacenar las propiedades del usuario

    const fetchUserProperties = async (currentLocation) => {

        try {
            const requestBody = {};

            // Realizar la petición al servidor
            const response = await axios.post(`${SERVER_URL}/api/properties/search`, requestBody);

            if (response.status === 200) {
                // Manejar la respuesta del servidor
                const propertiesWithDistance = response.data.map(prop => {
                    if (prop.coordenadas && prop.coordenadas.latitude && prop.coordenadas.longitude) {
                        const distance = calculateDistance(currentLocation.latitude, currentLocation.longitude, prop.coordenadas.latitude, prop.coordenadas.longitude);
                        return { ...prop, distance };
                    } else {
                        return { ...prop, distance: Number.MAX_VALUE };
                    }
                });
    
                const sortedProperties = propertiesWithDistance.sort((a, b) => a.distance - b.distance);
                setUserProperties(sortedProperties);

                //MUESTRA LAS COORDENADAS DE LA PROPIEDAD
                /*userProperties.forEach(propiedad => {
                    // Verificar si la propiedad tiene coordenadas
                    if (propiedad.coordenadas && Array.isArray(propiedad.coordenadas.coordinates)) {
                        // Acceder a las coordenadas
                        const coordenadas = propiedad.coordenadas.coordinates;
                        
                        // Longitud y Latitud
                        const longitud = coordenadas[1];
                        const latitud = coordenadas[0];
                
                        // Mostrar coordenadas por consola
                        console.log(`Propiedad ID: ${propiedad._id}, Latitud: ${latitud}, Longitud: ${longitud}`);
                    } else {
                        // Manejo de casos donde no hay coordenadas disponibles
                        console.log(`Propiedad ID: ${propiedad._id} no tiene coordenadas disponibles.`);
                    }
                });*/

            } else {
                console.error('Respuesta no exitosa:', response);
            }
        } catch (error) {
            console.error('Error en la petición de búsqueda:', error);
        }

    };
    //PERMISOS
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            return response === 'granted';
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This app needs access to your location.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
    };
    const [currentLocation, setCurrentLocation] = useState(null);

    //OBTENER UBICAION
    const getCurrentLocation = async () => {

        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            console.log('Location permission not granted');
            return;
        }
        Geolocation.getCurrentPosition(
            (position) => {
                const location  = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                setCurrentLocation(location);
                fetchUserProperties(location);



                //console.log(currentLocation);
                // Aquí puedes llamar a una función para obtener y ordenar las propiedades
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    };

    //CALCULADORA DE DISTANCIA
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distancia en km
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Este código se ejecutará cada vez que la pantalla esté en primer plano
            getCurrentLocation();
            fetchUserProperties();
        });

        return unsubscribe;
    }, [navigation]);


    const handleCardHorizontalPress = () => {
        // Define aquí la lógica de navegación

        //navigation.push(NavigatorConstant.LOGIN_STACK.REGISTER); // Navega a la pantalla 'Detalle'

    };

    const handleCardPress = () => {


    };

    const getRandomImageUrl = (images) => {
        if (!Array.isArray(images) || images.length === 0) {
            // Devuelve una URL predeterminada o null
            return 'https://picsum.photos/701'; // O alguna otra URL de imagen predeterminada
        }
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
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

    return (

        <ScrollView>
            <View style={styles.headerContainer}>
                <Image source={require('../../../../assets/images/Icons/lightMode/gps.png')} style={styles.icon} />
                <Title style={styles.title}>Propiedades cercanas</Title>
            </View>
            <View style={styles.carouselContainer}>

                <Carousel
                    data={userProperties.slice(0, 5)} // Muestra las 5 propiedades más cercanas
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={250} // Ancho de cada tarjeta en el carrusel
                />
            </View>

            <View style={styles.headerContainer}>
                <Image source={require('../../../../assets/images/Icons/lightMode/fav.png')} style={styles.icon} />
                <Title style={styles.title}>Favoritos</Title>
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
                            coverUrl={'https://picsum.photos/701'}
                            onPress={() => handleCardHorizontalPress(data._id)} // Pasa el ID de la propiedad al presionar
                        />
                    ))
                }
                {userProperties.filter((data) => data.reservada).length === 0 && (
                    <Text style={styles.noPropertiesText}>
                        No tienes propiedades en favoritos.
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
        flex: 1.5, // Ocupa el espacio superior
        alignItems: 'center',
    },
    cardsContainer: {
        flex: 1, // Ocupa el espacio inferior
        justifyContent: 'flex-end', // Alinea el botón en la parte inferior
        alignItems: 'center', // Alinea elementos secundarios en el centro
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Alinea el botón en la parte inferior
        marginLeft: 30,
        alignItems: 'center', // Alinea elementos secundarios en el centro
        flexDirection: 'row',
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 8,
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
        marginBottom: 20
    },
});

export default HomeUser;
