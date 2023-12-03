import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput, Divider } from 'react-native-paper';
import { DatePickerInput, registerTranslation } from 'react-native-paper-dates';
import { useNavigation } from '@react-navigation/native';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ContactPropertie = ({ route }) => {
    
    const navigation = useNavigation();

    const [text, setText] = React.useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const maxCharacterLimit = 500;

    const turnos = [
        { key: '1', value: 'Mañana' },
        { key: '2', value: 'Tarde' },
    ];

    const [turno, setTurno] = useState('');

    const handleTextChange = (inputText) => {
        setText(inputText);
        setCharacterCount(inputText.length);
    };


    //Input Date
    const [inputDate, setInputDate] = useState(undefined)

    const handleSend = async () => {

        try {

            const apiUrl = `${SERVER_URL}/api/contact/create`;

            // Obtiene el token de AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            // Establecer los valores de 'mañana' y 'tarde' basándose en la selección
            let mañana = false;
            let tarde = false;

            if (turno === 'Mañana') {
                mañana = true;
            } else if (turno === 'Tarde') {
                tarde = true;
            }


            // Construir el cuerpo de la petición
            const contactData = {
                message: text,
                mañana: mañana,
                tarde: tarde,
                date: inputDate,
                property: route.params.propertyId,
            };


            // Realiza la solicitud POST al servidor
            const response = await axios.post(apiUrl, contactData, {
                headers: {
                    Authorization: token, // Incluye el token en la cabecera de la solicitud
                },
            });

            if (response.status === 200) {

                // Muestra una alerta de registro exitoso
                alert('Turno creado exitosamente!');

                navigation.goBack();
            }

        } catch (error) {
            // Muestra una alerta de error en la creacion
            alert('Error al crear el contacto');
        }

    };


    return (
        <View style={styles.mainConteiner}>
             <ScrollView showsVerticalScrollIndicator={false}>
                <Text variant="headlineSmall" style={styles.title}>
                    Mensaje de Contacto
                </Text>
                <TextInput
                    mode='outlined'
                    value={text}
                    onChangeText={handleTextChange}
                    multiline={true}
                    maxLength={maxCharacterLimit}
                    style={styles.textInput}
                    outlineStyle= {{borderRadius: 20}}
                    outlineColor= {'black'}
                    activeOutlineColor= {'#4363AC'}
                />
                <Text style={styles.characterCount}>{`${characterCount}/${maxCharacterLimit}`}</Text>

                <Divider style={styles.divider} />

                <SelectList //Turno
                    boxStyles={styles.listBox} //Asigna estilo al box
                    dropdownStyles={styles.dropdown} //Asigna estilo al dropdown
                    inputStyles={styles.textDropList} //Asigna estilo al texto del contenido
                    dropdownTextStyles={styles.dropdownTextStyles} //Asigna estilo al texto del dropdown
                    setSelected={setTurno}
                    data={turnos}
                    search={false} //Habilita o no el buscador
                    maxHeight={100} //50 por cada item que haya
                    placeholder={"Turno"} //Texto a mostrar antes de la selección
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"} //Texto si no encuentra resultados el buscador
                    save='value' //Guarda el value o la key de la lista
                />

                <DatePickerInput
                    style= {{width: '80%', marginTop: 20}}
                    //locale={I18n.locale}
                    label={I18n.t('date')}
                    value={inputDate}
                    onChange={(d) => setInputDate(d)}
                    inputMode="start"
                    mode="outlined"
                    calendarIcon={require('../../../../assets/images/Icons/lightMode/calendar.png')}
                />

                <CustomButton
                    style={styles.button}
                    title={I18n.t('send')}
                    onPress={handleSend}
                />
            </ScrollView>  
        </View>
    );
};

const styles = StyleSheet.create({
    mainConteiner:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 13,
        marginTop: 50,
        paddingLeft: 5,
        color: 'black'
    },
    textInput: {
        flex: 2,
        alignSelf: 'center',
        marginTop: 10,
        height: 300,
        width: '100%',
        color: 'black'
    },
    characterCount: {
        alignSelf: 'flex-end',
        paddingRight: 5,
        marginTop: 5,
        color: 'gray',
    },
    divider: {
        width: '88%',
        padding: 0.5,
        margin: 20,
    },
    listBox: {
        alignSelf: 'center',
        width: 300,
        marginTop: 10,
        backgroundColor: '#E0E4F2',
        borderRadius: 100,
        borderColor: '#E0E4F2',
    },
    dropdown: {
        alignSelf: 'center',
        width: 300,
        backgroundColor: '#E0E4F2',
        borderColor: '#E0E4F2',
    },
    textDropList: {
        color: 'black'
    },
    dropdownTextStyles: {
        color: 'black'
    },
    dateStyle: {
        flex: 1,
        alignSelf: 'center',
        width: 200
    },
    button: {
        alignSelf: 'center',
        margin: 50,
        width: 200,
    },

});

export default ContactPropertie;