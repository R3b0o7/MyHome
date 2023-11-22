import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import { Text, Title } from 'react-native-paper';
import I18n from '../../../../assets/strings/I18';
import CustomCard from '../../../components/CustomCard';

const ResultPropertie = ({ route }) => {

    const navigation = useNavigation();

    // Crear un estado para almacenar los IDs de las propiedades
    const [propiedades, setPropiedades] = useState([]);

    const handleCardHorizontalPress = (propertyId) => {
        // Navega a la pantalla 'Detalle' y pasa el ID de la propiedad como parámetro
        navigation.push(NavigatorConstant.SEARCH_.PROPERTIES_USER, {
            propertyId: propertyId,
        });
    };

    useEffect(() => {
        if (route.params && route.params.propertyIds) {
            // Almacenar los IDs de las propiedades en el estado
            setPropiedades(route.params.propertyIds);
        }
    }, [route.params]);

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
                <Image source={require('../../../../assets/images/Icons/propiedades.png')} style={styles.icon} />
                <Title style={styles.title}>Resultados</Title>
            </View>
            <View style={styles.cardsContainer}>

                {propiedades
                    .map((data, index) => (
                        <View key={index} style={styles.cardStyle}>
                            <CustomCard
                                key={index}
                                address={data.calle + ' ' + data.numero}
                                description={
                                    (data.alquiler ? 'Alquiler' :
                                        data.venta ? 'Venta' :
                                            data.reservada ? 'Reservada' :
                                                data.alquiladaVendida ? 'Alquilada o Vendida' : '')
                                    + ' - ' + data.localidad // Aquí puedes añadir tu texto
                                }
                                coverUrl={getRandomImageUrl(data.photos)}
                                CustomButtonTitle={I18n.t('view')}
                                //onPress={() => handleCardHorizontalPress(data._id)}
                                onCustomButtonPress={() => handleCardHorizontalPress(data._id)}// Pasa el ID de la propiedad al presionar
                            />
                        </View>
                    ))

                }


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
        marginLeft: 31,
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    cardStyle: {
        marginVertical: 10, // Ajusta este valor según el espacio deseado
    },
});

export default ResultPropertie;