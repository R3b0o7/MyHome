import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Divider, TextInput  } from 'react-native-paper';
import I18n from '../../../../assets/strings/I18';

import { SERVER_URL } from '../../../../config/config';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import axios from 'axios';

import CustomButton from '../../../components/CustomButton';

const ReservePropertie2 = ({route}) => {

    const [textInputData, setFacturacionnData] = useState({
        numTarjeta: '',
        mmVencimiento: '',
        yyVencimiento: '',
        csv: '',
        titular: '',
        dni: '',
        direccion: '',
    });
    
    //NAVEGACION
    const navigation = useNavigation();

    const handlePay = async () => {
        //navigation.push(NavigatorConstant.HOME_USER_STACK.PAY_RESERVE, {textInputData});
    };
    const handleCancel = async () => {

        navigation.goBack();
       
    };

    //DAROS PROPIEDAD
    const isFocused = useIsFocused();

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

    return (
        <View style={styles.container}>
             <ScrollView
                bounces={false}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.title}>
                    {propertyData.calle + ' ' + propertyData.numero + ' ' +
                    propertyData.piso + '° ' + propertyData.departamento
                    }
                </Text>

                <Text style={styles.description}>
                    Departamento en {propertyData.alquiler ? 'alquiler' : 'venta'} hubicado {propertyData.localidad}, {propertyData.provincia}
                </Text>
                
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

                <TextInput
                    style={styles.textImput}
                    label={I18n.t('numTarjeta')}
                    mode= 'outlined'
                    activeOutlineColor= '#4363AC'
                    value={textInputData.numTarjeta}
                    onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, ''); 
                        setFacturacionnData({ ...textInputData, numTarjeta: numericText });
                    }}
                    keyboardType="numeric"
                />

                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.textImput}
                        label={I18n.t('mmVencimiento')}
                        mode= 'outlined'
                        activeOutlineColor= '#4363AC'
                        value={textInputData.mmVencimiento}
                        onChangeText={(text) => {
                            const numericText = text.replace(/[^0-9]/g, ''); 
                            setFacturacionnData({ ...textInputData, mmVencimiento: numericText });
                        }}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.textImput}
                        label={I18n.t('yyVencimiento')}
                        mode= 'outlined'
                        activeOutlineColor= '#4363AC'
                        value={textInputData.yyVencimiento}
                        onChangeText={(text) => {
                            const numericText = text.replace(/[^0-9]/g, ''); 
                            setFacturacionnData({ ...textInputData, yyVencimiento: numericText });
                        }}
                    keyboardType="numeric"
                    />
                </View>  

                <TextInput
                    style={{width: 100, alignSelf: 'center'}}
                    label={I18n.t('csv')}
                    mode= 'outlined'
                    secureTextEntry={true}
                    activeOutlineColor= '#4363AC'
                    value={textInputData.csv}
                    onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, ''); 
                        setFacturacionnData({ ...textInputData, csv: numericText });
                    }}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.textImput}
                    label={I18n.t('titular')}
                    mode= 'outlined'
                    activeOutlineColor= '#4363AC'
                    value={textInputData.titular}
                    onChangeText={(text) => {
                        setFacturacionnData({ ...textInputData, titular: text});
                    }}
                />

                <TextInput
                    style={styles.textImput}
                    label={I18n.t('dni')}
                    mode= 'outlined'
                    activeOutlineColor= '#4363AC'
                    value={textInputData.dni}
                    onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, ''); 
                        setFacturacionnData({ ...textInputData, dni: numericText });
                    }}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.textImput}
                    label={I18n.t('dirFacturacion')}
                    mode= 'outlined'
                    activeOutlineColor= '#4363AC'
                    value={textInputData.direccion}
                    onChangeText={(text) => {
                        setFacturacionnData({ ...textInputData, direccion: text });
                    }}
                />

                <View style={styles.contentContainer}>
                    <CustomButton 
                        title='CANCELAR' 
                        color="blue" 
                        onPress={handleCancel} 
                        style={styles.butons} />
                    <CustomButton 
                        title='PAGAR' 
                        color="blue" 
                        onPress={handlePay} 
                        style={styles.butons} />
                </View>   
                
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignContent:'center',
        flexDirection: 'row',
    },
    currencyContainer:{
        justifyContent: 'center',
        alignContent:'center',
        flexDirection: 'row',
        marginTop: 10
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginLeft: 30
    },
    description: {
        fontSize: 15,
        color: 'grey',
        marginLeft: 30,
        marginRight: 30
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
        height:35
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
        height:35
    },
    divider: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        height: 2
    },
    textImput: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    butons: {
        width: 100,
        margin: 40,
    },
});

export default ReservePropertie2;