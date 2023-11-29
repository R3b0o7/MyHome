import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert} from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';
import ImageButton from '../../../components/ImageButton';

const PayReserve = ({route}) => {
    
    //NAVEGACION
    const navigation = useNavigation();

    const handleRate = async () => {
        navigation.push(NavigatorConstant.SEARCH_.CALIFICATION_INM);
    };

    const handleRateLater = async () => {
        navigation.push(NavigatorConstant.TAB_STACK_USER.SEARCH);
    };

    //DAROS PROPIEDAD

    const { textInputData } = route.params;

    //DATOS DE FACTURA 

    // Generar un número aleatorio de 10 caracteres
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    // Cortar los ultimos 4 numeros de la tarjeta
    const lastFourDigits = textInputData.numTarjeta.slice(-4);

    // Obtener la fecha actual
    const currentDate = new Date();

    // Obtener el año, mes y día
    const year = currentDate.getFullYear();
    // JavaScript cuenta los meses desde 0, por lo que necesitas sumar 1
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    // Formatear la fecha como una cadena (puedes personalizar el formato según tus necesidades)
    const formattedDate = `${day}/${month}/${year}`;

    //EXPORTAR PDF


    return (
        <View style={styles.container}>

            <View style={styles.payStatusContainer}>

                <Text style={styles.textPaymentValue}>Pago exitoso</Text>

                <Image style={styles.paymentStatusIcon} source={require('../../../../assets/images/Icons/lightMode/propiedades.png')}/>

                <View style={styles.valueContainer}>
                    <Text style={styles.textPaymentValue}> {textInputData.moneda} </Text>
                    <Text style={styles.textPaymentValue}> {textInputData.valor} </Text>
                </View>
                                    
            </View>

            <View style={styles.dataContainer}>

                <View style={styles.paymentData}>
                    <Text> Monto </Text>
                    <Text> {textInputData.moneda} {textInputData.valor} </Text>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.paymentData}>
                    <Text> Fecha </Text>
                    <Text> {formattedDate} </Text>
                </View>
                
                <Divider style={styles.divider} />

                <View style={styles.paymentData}>
                    <Text> ID de orden </Text>
                    <Text> {randomNumber} </Text>
                </View>
                
                <Divider style={styles.divider} />

                <View style={styles.paymentData}>
                    <Text> Metodo de pago </Text>
                    <Text> Visa - {lastFourDigits} </Text>
                </View>
                
                <Divider style={styles.divider} />

                <View style={styles.paymentData}>
                    <Text> Nombre del cliente </Text>
                    <Text> {textInputData.titular} </Text>
                </View>
                
                <Divider style={styles.divider} />

                {/* <View style={styles.paymentData}>
                    <Text> Inmobiliaria </Text>
                    <Text> {textInputData} </Text>
                </View>
                
                <Divider style={styles.divider} /> */}

                <View style={styles.paymentData}>
                    <Text> Estado </Text>
                    <Text> Aprobado </Text>
                </View>
                
                {/* TODO: DESCARGAR COMO PDF */}
                
                {/* <ImageButton
                    imageStyle={styles.downloadIcon}
                    imageSource={require('../../../../assets/images/Icons/lightMode/download.png')}
                    
                /> */}

            </View>

            <View style={styles.butonsContainer}>

           <CustomButton title={I18n.t('calificarAhora')} color="blue" onPress={handleRate} style={styles.butons} />
           <CustomButton title={I18n.t('calificarLuego')} color="blue" onPress={handleRateLater} style={styles.butons} />

            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container:{
        flex: 4,
    },
    payStatusContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignContent:'center',
        width: '100%',
        backgroundColor: '#579F6F'
    },
    dataContainer:{
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10
    },
    butonsContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 40,
    },
    valueContainer:{
        flexDirection: 'row',
        alignSelf: 'center',
    },
    paymentData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textPaymentValue:{
        justifyContent: 'center',
        alignContent:'center',
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    paymentStatusIcon: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        margin: 10,
        tintColor: 'white'
    },
    divider: {
        marginTop: 5,
        marginBottom: 5,
        height: 2
    },
    downloadIcon: {
        width: 50,
        height: 50,
    },
    butons: {
        width: 150,
        height: 50,
        margin: 10,
    },    
});

export default PayReserve;