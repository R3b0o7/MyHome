import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Alert, ScrollView } from 'react-native';
import { Chip, Divider, Text } from 'react-native-paper';
import ImagePop from '../../../components/ImagePop';
import Carousel from 'react-native-snap-carousel';
import I18n from '../../../../assets/strings/I18';
import { SERVER_URL } from '../../../../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import ImageCustomButton from '../../../components/ImageCustomButton'


const IndividualPropertieScreen2 = ({ route }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const pressHandler = () => {
        Alert.alert("Eliminar propiedad", "¿Estás seguro de que deseas eliminar la propiedad?", [
            { text: "Sí", onPress: () => handleToDelete() },
            { text: "No" }
        ]);
    }

    const pressEdit = () => {
        const propertyId = route.params.propertyId;
        navigation.push(NavigatorConstant.PROPERTIES_STACK.PROPPERTIES_UPDATE, {
            propertyId: propertyId,
        });
    }

    const handleToDelete = async () => {
        try {
            const propertyId = route.params.propertyId;
            const authToken = await AsyncStorage.getItem('authToken');

            if (!authToken) {
                console.error('Token de autorización no encontrado en AsyncStorage');
                return;
            }

            const response = await axios.delete(`${SERVER_URL}/api/properties/${propertyId}`, {
                headers: {
                    Authorization: authToken,
                },
            });

            if (response.status === 200) {
                alert('Se borró la propiedad con éxito');
                navigation.goBack();
            } else {
                console.error('Error al eliminar la propiedad:', response.data.message);
            }
        } catch (error) {
            console.error('Error al eliminar la propiedad:', error);
        }
    };
    const pressHandlerFavorite = async () => {
        try {

            // Obtener el token del usuario desde AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            // Configuración para la solicitud axios (headers con token)
            const config = {
                headers: { Authorization: token }
            };

            // Enviar solicitud para agregar/eliminar de favoritos
            const response = await axios.put(`${SERVER_URL}/api/users/toggleFavorite`, {
                propertyId: route.params.propertyId
            }, config);

            // Mostrar alerta con la respuesta del servidor
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error al modificar favoritos:', error);
            Alert.alert('Error', 'No se pudo modificar la lista de favoritos');
        }
    };

    const initialCharacteristics = {};
    const [propertyData, setPropertyData] = useState(initialCharacteristics);

    const fetchPropertyData = async () => {
        try {
            const propertyId = route.params.propertyId;

            const response = await axios.get(`${SERVER_URL}/api/properties/${propertyId}`);

            if (response.status === 200) {
                setPropertyData(response.data);
            } else {
                console.error('Error al obtener los datos de la propiedad:', response.data.message);
            }
        } catch (error) {
            console.error('Error al obtener los datos de la propiedad:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchPropertyData();
        }
    }, [isFocused]);

    const carouselItems = propertyData.photos 
        ? propertyData.photos.map((photoUrl, index) => ({
            id: index,
            coverUrl: photoUrl,
        }))
        : [];
    
    const chipsData = [
        { icon: require('../../../../assets/images/Icons/black/m2.png'), label: `${propertyData.m2cubiert}m2` },
        { icon: require('../../../../assets/images/Icons/black/ambientes.png'), label: `${propertyData.cantambient} amb.` },
        { icon: require('../../../../assets/images/Icons/black/bed.png'), label: `${propertyData.cantcuartos} dorm.` },
        { icon: require('../../../../assets/images/Icons/black/bano.png'), label: `${propertyData.cantbaños} baño` },
        { icon: require('../../../../assets/images/Icons/black/calendar.png'), label: `${propertyData.antiguedad} años` },
        { icon: require('../../../../assets/images/Icons/black/car.png'), label: `cochera: ${propertyData.cochera ? 'SI' : 'NO'}` },
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

    const amenidadesFiltradas = Object.entries(amenidades)
        .filter(([amenidad, valor]) => valor)
        .map(([amenidad, valor]) => ({ label: amenidad }));

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <ImagePop
                    coverUrl={item.coverUrl}
                />
            </View>
        );
    };

    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

                <View style={styles.currencyContainer}>
                    <Text style={styles.currency}>
                        {propertyData.dolar ? 'U$S' : 'AR$'}
                    </Text>
                    <Text style={styles.price}>
                        {/* el 'en-US' deberia mostrar el separador de miles como . y no como , pero no funciona */}
                        {Number(propertyData.precio).toLocaleString('en-US')}
                    </Text>
                </View>

                <Divider style={styles.divider} />

                <Text variant="headlineSmall" style={styles.subtitle}>
                    Caracteristicas

                </Text>


                <ScrollView horizontal style={{ alignSelf: 'center' }}>
                    <FlatList
                        data={chipsData}
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

                <ScrollView horizontal style={{ alignSelf: 'center' }}>
                    <FlatList
                        data={amenidadesFiltradas}
                        renderItem={({ item }) => (
                            <Chip style={styles.chipStyle}>
                                {item.label}
                            </Chip>
                        )}
                        numColumns={2} // Establece el número de columnas en 2
                    />
                </ScrollView>

                <Text variant="headlineSmall" style={styles.subtitle}>
                    Descripción
                </Text>

                <Text style={styles.subtitle}>
                    {propertyData.descripcion}
                </Text>

                <Text/>


            </ScrollView>

            <Divider style={{ marginTop: 5, marginBottom: 0 }} />

            <View style={styles.lowerContainer}>
                {/* Contenedor inferior (1/4 de la pantalla) */}
{/* 
                <CustomButton
                    style={styles.boton}
                    title={I18n.t('edit')}
                    onPress={pressEdit}
                /> */}

                <ImageCustomButton
                    style={styles.ImageBoton}
                    imageSource={require('../../../../assets/images/Stars/starFull.png')}
                // title={I18n.t('favorite')}
                    onPress={pressHandlerFavorite}
                />

                {/* <CustomButton
                    style={styles.boton}
                    title={I18n.t('deletePropertie')}
                    onPress={pressHandler}
                /> */}

            </View>
        </View>

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
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    lowerContainer: {

        bottom: 0,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boton: {
        width: 100,
        marginRight: 10,
        marginLeft: 10
    },
    ImageBoton: {
        width: 50,
        height: 40,
        marginRight: 10,
        marginLeft: 10
    },
    //VISTA DE PRECIO Y MONEDA
    currencyContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    currency: {
        zIndex: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 12,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E0E4F2',
        backgroundColor: '#707787',
        position: 'relative',
        marginRight: 140,
        width: 60,
        height: 35
    },
    price: {
        zIndex: 1,
        textAlign: 'center',
        paddingLeft: 50,
        textAlignVertical: 'center',
        borderRadius: 12,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#ACB4CB',
        position: 'absolute',
        width: 200,
        height: 35
    },
});

export default IndividualPropertieScreen2;
