import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Alert, ScrollView } from "react-native";
import { Chip, Divider, Text } from 'react-native-paper';
import ImagePop from "../../../components/ImagePop";
import Carousel from 'react-native-snap-carousel';
import I18n from '../../../../assets/strings/I18';
import { SERVER_URL } from '../../../../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from "../../../../navigation/NavigatorConstant";

const IndividualPropertieScreen = ({ route }) => {

    const navigation = useNavigation();

    const pressHandler = () => {
        Alert.alert("Eliminar propiedad", "Estás seguro que desas eliminar la propiedad?", [
            { text: "Sí", onPress: () => handleToDelete() },
            { text: "No" }
        ])
    }

    const pressEdit = () =>{
        navigation.push(NavigatorConstant.PROPERTIES_STACK.PROPPERTIES_UPDATE);
    }

    const handleToDelete = async () => {
        try {
            const propertyId = route.params.propertyId;

            // Obtén el token de autorización desde AsyncStorage
            const authToken = await AsyncStorage.getItem('authToken');

            if (!authToken) {
                console.error('Token de autorización no encontrado en AsyncStorage');
                return;
            }

            // Realiza una solicitud DELETE al endpoint del servidor para eliminar la propiedad
            const response = await axios.delete(`${SERVER_URL}/api/properties/${propertyId}`, {
                headers: {
                    Authorization: authToken,
                },
            });

            if (response.status === 200) {

                alert('Se borro la propiedad con extito');

                navigation.goBack();

            } else {
                console.error('Error al eliminar la propiedad:', response.data.message);
            }
        } catch (error) {
            console.error('Error al eliminar la propiedad:', error);
        }
    };


    const initialCharacteristics = {};

    const [propertyData, setPropertyData] = useState(initialCharacteristics);

    useEffect(() => {
        // Obtiene el ID de la propiedad desde las props de la navegación
        const propertyId = route.params.propertyId;   //route.params.propertyId;

        // Recupera el token de autorización almacenado en AsyncStorage
        AsyncStorage.getItem('authToken')
            .then(authToken => {
                if (authToken) {
                    // Define las cabeceras de la solicitud con el token de autorización
                    const headers = {
                        Authorization: authToken,
                    };

                    // Realiza una solicitud GET con las cabeceras configuradas
                    axios.get(`${SERVER_URL}/api/properties/${propertyId}`, { headers })
                        .then(response => {
                            // Establece los datos de la propiedad en el estado
                            setPropertyData(response.data);
                        })
                        .catch(error => {
                            console.error('Error al obtener los datos de la propiedad:', error);
                        });
                } else {
                    console.error('Token de autorización no encontrado en AsyncStorage');
                }
            })
            .catch(error => {
                console.error('Error al recuperar el token de autorización:', error);
            });
    }, []);



    const carouselItems = [
        {
            id: 1,
            coverUrl: 'https://picsum.photos/700',
        },
        {
            id: 2,
            coverUrl: 'https://picsum.photos/701',
        },
        {
            id: 3,
            coverUrl: 'https://picsum.photos/702',
        },
        // Agrega más tarjetas si es necesario
    ];

    const chipsData = [
        { icon: require('../../../../assets/images/Icons/black/m2.png'), label: propertyData.m2cubiert },
        { icon: require('../../../../assets/images/Icons/black/ambientes.png'), label: propertyData.cantambient },
        { icon: require('../../../../assets/images/Icons/black/bed.png'), label: propertyData.cantcuartos },
        { icon: require('../../../../assets/images/Icons/black/bano.png'), label: propertyData.cantbaños },
        { icon: require('../../../../assets/images/Icons/black/calendar.png'), label: propertyData.antiguedad },
        { icon: require('../../../../assets/images/Icons/black/car.png'), label: propertyData.cochera ? 'SI' : 'NO' },
    ];

    const amenidades = {
        Sum: propertyData.sum,
        Pool: propertyData.pool,
        Quincho: propertyData.quincho,
        Solarium: propertyData.solarium,
        Sauna: propertyData.sauna,
        Roomgames: propertyData.roomgames,
        Calefaccion: propertyData.calefaccion,
        Coworking: propertyData.coworking,
        Microcine: propertyData.microcine,
        // Agregar otras amenidades aquí
    };

    // Filtrar solo las amenidades que son true
    const amenidadesFiltradas = Object.entries(amenidades)
        .filter(([amenidad, valor]) => valor)
        .map(([amenidad, valor]) => ({ label: amenidad }));



    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <ImagePop
                    coverUrl={item.coverUrl}
                //onCustomButtonPress={handleCardPress} // Pasa la función personalizada
                />
            </View>
        );
    };



    return (
        <ScrollView>
            <View style={styles.carouselContainer}>
                <Carousel
                    data={carouselItems}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={250} // Ancho de cada tarjeta en el carrusel
                />
            </View>

            <Text variant="headlineMedium" style={styles.title}>
                {propertyData.calle} {propertyData.numero} {propertyData.piso} {propertyData.departamento}
            </Text>



            <Divider style={styles.divider} />

            <View>
                <Text style={{ fontSize: 30, alignSelf: 'center' }}>
                    {propertyData.dolar ? 'US$' : '$'}
                    {propertyData.precio}
                </Text>
            </View>

            <Divider style={styles.divider} />

            <Text variant="headlineSmall" style={styles.subtitle}>
                Caracteristicas
            </Text>

            <ScrollView horizontal>
                <FlatList
                    data={chipsData}
                    style={{ alignSelf: 'center', marginLeft: 80, marginTop: 0 }}
                    renderItem={({ item }) => (
                        <Chip style={styles.chipStyle} icon={item.icon}>
                            {item.label}
                        </Chip>
                    )}
                    numColumns={2} // Establece el número de columnas en 2
                />
            </ScrollView>

            <Text variant="headlineSmall" style={styles.subtitle}>
                Amenities
            </Text>

            <ScrollView horizontal>
                <FlatList
                    data={amenidadesFiltradas}
                    style={{ alignSelf: 'center', marginLeft: 80, marginTop: 0 }}
                    renderItem={({ item }) => (
                        <Chip style={styles.chipStyle}>
                            {item.label}
                        </Chip>
                    )}
                    numColumns={2} // Establece el número de columnas en 2
                />
            </ScrollView>

            <Divider style={{ marginTop: 5, marginBottom: 0 }} />

            <Divider style={styles.divider} />
            <View style={styles.lowerContainer}>
                {/* Contenedor inferior (1/4 de la pantalla) */}
                <Text/>
                <CustomButton
                    title={I18n.t('edit')}
                    onPress={pressEdit}
                />
                <Text/>
                <CustomButton
                    title={I18n.t('deletePropertie')}
                    onPress={pressHandler}
                />
                <Text/>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chipStyle: {
        backgroundColor: '#E0E4F2',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 20,
        width: 110
    },
    carouselContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 40
    },
    subtitle: {
        marginTop: 20,
        marginLeft: 40
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 40,
        marginRight: 40
    },
    divider: {
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        height: 2
    },
    lowerContainer: {
        flex: 0.5, // Este contenedor ocupará 1/4 de la pantalla
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default IndividualPropertieScreen;