import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CustomCard from '../../../components/CustomCard';
import I18n from '../../../../assets/strings/I18';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import HorizontalCustomCard from '../../../components/HorizontalCustomCard';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleCardHorizontalPress = () => {
        // Define aquí la lógica de navegación

        //navigation.push(NavigatorConstant.LOGIN_STACK.REGISTER); // Navega a la pantalla 'Detalle'

    };

    const handleCardPress = () => {
        // Define aquí la lógica de navegación

        //navigation.push(NavigatorConstant.LOGIN_STACK.REGISTER); // Navega a la pantalla 'Detalle'

    };

    const carouselItems = [
        {
            id: 1,
            address: '123 Main St',
            description: 'A beautiful place',
            coverUrl: 'https://picsum.photos/700',
            CustomButtonTitle: I18n.t('view'),
        },
        {
            id: 2,
            address: '456 Elm St',
            description: 'Another beautiful place',
            coverUrl: 'https://picsum.photos/701',
            CustomButtonTitle: I18n.t('view'),
        },
        {
            id: 3,
            address: '789 Oak St',
            description: 'Yet another beautiful place',
            coverUrl: 'https://picsum.photos/702',
            CustomButtonTitle: I18n.t('view'),
        },
        // Agrega más tarjetas si es necesario
    ];

    const horizontalCardData = [
        {
            id: 1,
            address: '123 Main St',
            operation: 'Venta',
            coverUrl: 'https://picsum.photos/701',
        },
        {
            id: 2,
            address: '456 Elm St',
            operation: 'Venta',
            coverUrl: 'https://picsum.photos/702',
        },
        {
            id: 3,
            address: '789 Oak St',
            operation: 'Venta',
            coverUrl: 'https://picsum.photos/703',
        },
        {
            id: 4,
            address: '987 Elm St',
            operation: 'Alquiler',
            coverUrl: 'https://picsum.photos/704',
        }
    ];


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <CustomCard
                    address={item.address}
                    description={item.description}
                    coverUrl={item.coverUrl}
                    CustomButtonTitle={item.CustomButtonTitle}
                    onCustomButtonPress={handleCardPress} // Pasa la función personalizada
                />
            </View>
        );
    };

    return (

        <ScrollView>
            <View style={styles.carouselContainer}>
                <Title style={styles.title}>Mis destacadas</Title>
                <Carousel
                    data={carouselItems}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={250} // Ancho de cada tarjeta en el carrusel
                />
            </View>
            <View style={styles.cardsContainer}>
                <Title style={styles.title2}>Propiedades reservadas</Title>
                
                    {horizontalCardData.map((data, index) => (
                        <HorizontalCustomCard
                            key={index}
                            address={data.address}
                            operation={data.operation}
                            coverUrl={data.coverUrl}
                            onPress={handleCardHorizontalPress}
                        />
                    ))}
                

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
});

export default HomeScreen;
