import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
    const [inputDate, setInputDate] = React.useState(undefined)

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
        <View style={styles.container}>
            <View style={styles.insideContainer}>
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
        fontSize: 13,
        marginTop: 50,
    },
    textInput: {
        marginTop: 10,
        height: 300,
        width: '100%',
    },
    characterCount: {
        alignSelf: 'flex-end',
        marginTop: 5,
        color: 'gray',
    },
    divider: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
        height: 2
    },
    button: {
        margin: 50,
        marginLeft: 120,
        marginRight: 120,
    },
    insideContainer: {
        flex: 3, // Este contenedor ocupará 3/4 de la pantalla
        width: '80%',
        justifyContent: 'start',
        alignItems: 'start',
        // Puedes agregar estilos adicionales según tus necesidades
    },
    listBox: {
        width: 300,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#E0E4F2',
        borderRadius: 100,
        borderColor: '#E0E4F2',
    },
    dropdown: {
        backgroundColor: '#E0E4F2',
        borderColor: '#E0E4F2',
    },
    textDropList: {
        color: 'black'
    },
    dropdownTextStyles: {
        color: 'black'
    },

});

export default ContactPropertie;