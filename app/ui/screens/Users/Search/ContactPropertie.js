import React, {useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { TextInput, Divider} from 'react-native-paper';
import { DatePickerInput, registerTranslation } from 'react-native-paper-dates';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomButton from '../../../components/CustomButton';


const ContactPropertie = () => {


    const navigation = useNavigation();
    //const { propertyInfo } = route.params; // NECESITO CREAR EN RESULT PROPERTY
    
    const [text, setText] = React.useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const maxCharacterLimit = 500;

    const initialScheduleTypes = {
        morning: false,
        afternoon: false,
    };

    const [scheduleTypes, setScheduleTypes] = useState(initialScheduleTypes);

    const handleTextChange = (inputText) => {
      setText(inputText);
      setCharacterCount(inputText.length);
    };

    //Tipo de Turno
    const handleScheduleChange = (scheduleTypes) => {
        const updatedScheduleTypes = { ...initialScheduleTypes };
        updatedScheduleTypes[scheduleTypes] = !scheduleTypes[scheduleTypes];
        setScheduleTypes(updatedScheduleTypes);
    };

    //Input Date
    const [inputDate, setInputDate] = React.useState(undefined)

    const handleSend = async () => {

        try {
            const apiUrl = `${SERVER_URL}/api/contact/create`;

            // Obtiene el token de AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            // Define los datos a enviar en la solicitud
            const contactData = {
                message: text,
                morning: scheduleTypes.morning,
                afternoon: scheduleTypes.afternoon,
                date: inputDate,
                property: propertyInfo.id,
            }

            // Realiza la solicitud POST al servidor
            const response = await axios.post(apiUrl, contactData, {
                headers: {
                    Authorization: token, // Incluye el token en la cabecera de la solicitud
                },
            });

            // Muestra una alerta de registro exitoso
            alert('Contacto creado exitosamente!');

            navigation.goBack();

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

                {Object.keys(scheduleTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={scheduleTypes[type]}
                            onValueChange={() => handleScheduleChange(type)}
                            tintColors={{ true: '#4363AC', false: '#49454F' }}
                        />
                    </View>
                ))}

                <DatePickerInput
                    locale={I18n.locale}
                    label={I18n.t('date')}
                    value={inputDate}
                    onChange={(d) => setInputDate(d)}
                    inputMode="start"
                    mode="outlined"
                    calendarIcon={require('../../../../assets/images/Icons/lightMode/calendar.png')}
                />
                <CustomButton 
                    style = {styles.button}
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
        width:'100%',
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
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
    },
    checkboxText: {
        fontSize: 16,
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

});

export default ContactPropertie;