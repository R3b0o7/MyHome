import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import I18n from '../../../../assets/strings/I18';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import HorizontalCustomCard from '../../../components/HorizontalCustomCard';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';


const HomeScreen = () => {
    const navigation = useNavigation();

    const handleToRegister = () => {
        navigation.push(NavigatorConstant.PROPERTIES_STACK.TOREGISTER); // Navega a la pantalla de crear propiedad
    };
    
    const handleCardHorizontalPress = () => {
        navigation.push(NavigatorConstant.PROPERTIES_STACK.PROPPERTIES_VIEW); // Navega a la pantalla 'Detalle'
    };

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
            address: '789 Oak St',
            operation: 'Venta',
            coverUrl: 'https://picsum.photos/703',
        },
        {
            id: 5,
            address: '789 Oak St',
            operation: 'Venta',
            coverUrl: 'https://picsum.photos/703',
        },
        {
            id: 6,
            address: '987 Elm St',
            operation: 'Alquiler',
            coverUrl: 'https://picsum.photos/704',
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Title style={styles.title}>{I18n.t('myProperties')}</Title>
                <ScrollView>
                    {horizontalCardData.map((data, index) => (
                        <HorizontalCustomCard
                            key={index}
                            address={data.address}
                            operation={data.operation}
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
