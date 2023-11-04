import * as React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import CustomCommentsCard from '../../../components/CustomCommentsCard';
import { Image } from 'react-native';
import Stars from '../../../components/Stars';

const ComentsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../../../assets/images/PaginaEnConstruccion.png')}
                    // source={require('../../../../assets/images/Icons/lightMode/message.png')}
                    style={styles.image}
                />
                {/* <Text style={styles.title}>Histórico de Comentarios</Text> */}
            </View>
            {/* <CustomCommentsCard /> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:200,
        paddingHorizontal: 20, // Espacio horizontal dentro del contenedor
    },
    header: {
        flexDirection: 'row', // Coloca la imagen y el título en fila
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 25, // Tamaño del título
        marginBottom: 10, // Espacio inferior
    },
    image: {
        width: 300, // Ancho de la imagen
        height: 350, // Altura de la imagen
        //marginRight: 10, // Espacio entre la imagen y el título
    },
});

export default ComentsScreen;
