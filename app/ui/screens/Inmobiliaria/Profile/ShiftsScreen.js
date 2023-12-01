import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const ShiftsScreen = () => {
    return (    
        <View style={styles.MainContainer}>
            <ScrollView>
                {/* TITULO DE ENCABEZADO */}
                <View style={styles.TitleConteiner}>
                    <Image style={styles.ImageTitle} source={require('../../../../assets/images/Icons/lightMode/calendar.png')} />
                    <Text style={styles.Title}> Mis Turnos </Text>
                </View>
                {/* COMPONENTES DE RESERVAS */}


            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    TitleConteiner: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 10,
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    ImageTitle: {
        width: 33,
        height: 36,
        marginRight: 10,
    },
    Title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },

});

export default ShiftsScreen;
