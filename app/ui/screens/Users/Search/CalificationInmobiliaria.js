import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert} from 'react-native';
import { TextInput, Divider } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InmobiliariaCard from '../../../components/InmobiliariaCard';
import CustomButton from '../../../components/CustomButton';
import InteractiveRatingStars from '../../../components/InteractiveRatingStars';


const CalificationInmobiliaria = ({route}) => {

    const propertyId = route.params.propertyId;
    
    const navigation = useNavigation();

    const handleSave = async () => {
        try {
            // Obtener el ID del usuario del AsyncStorage
            const token = await AsyncStorage.getItem('authToken'); // Asegúrate de que el ID del usuario esté almacenado en AsyncStorage
    
            // Preparar el objeto con los datos del comentario
            const commentData = {
                comment: text,
                propertyId: propertyId, // Asegúrate de que esta variable contenga el ID de la propiedad
                calificacion: rating
            };
    
            // Configuración para la solicitud axios (headers con token)
            const config = {
                headers: { Authorization: token }
            };
    
            // Enviar solicitud POST para crear el comentario
            const response = await axios.post(`${SERVER_URL}/api/usersComun/createComment`, commentData, config);
    
            if (response.status === 200) {
                Alert.alert('Éxito', 'Comentario creado con éxito');
                navigation.popToTop();
            } else {
                console.error('Error al crear el comentario:', response.data.message);
            }
        } catch (error) {
            console.error('Error al crear el comentario:', error);
        }
    };

    /*const handleComents = () => {
        //pantalla de comentarios de la inmobiliaria
        navigation.push(NavigatorConstant.SEARCH_.COMENTS_PROPERTIES);
    };*/

    const [text, setText] = React.useState("");
    const maxCharacterLimit = 350;
    const [characterCount, setCharacterCount] = useState(0);
    const [rating, setRating] = useState(0);
    
    const handleTextChange = (inputText) => {
        setText(inputText);
        setCharacterCount(inputText.length);
    };
    
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        // Haz lo que necesites con la nueva calificación, por ejemplo, actualiza el estado
        console.log('Nueva calificación:', newRating);
      };

    return (
        <View style={styles.mainConteiner}>
                {/* <View style={styles.RalStateCard}>
                    <InmobiliariaCard  //HARCODEADO!!!
                        nombre= "Inmobiliara SRL"
                        rating={4} 
                        coverUrl= 'https://picsum.photos/701'
                        onPress={handleComents}
                    /> 
                </View>     */}

                <Text style={[styles.Titles, {marginTop: 20}]}> Comentario </Text>

                <TextInput
                        mode='outlined'
                        value={text}
                        onChangeText={handleTextChange}
                        multiline={true}
                        maxLength={maxCharacterLimit}
                        outlineColor= {'black'}
                        activeOutlineColor= {'#4363AC'}
                        style={styles.textInput}
                        outlineStyle= {{borderRadius: 20}}
                    />
                <Text style={styles.characterCount}>{`${characterCount}/${maxCharacterLimit}`}</Text>

                <Divider style={styles.divider} />

                <Text style={styles.Titles}> Calificar </Text>

                <InteractiveRatingStars 
                    onChange={handleRatingChange}
                    starIconFilled={styles.starIconFilled}
                    starIcon={styles.starIcon}
                />

                <CustomButton title='GUARDAR' color="blue" onPress={handleSave} style={styles.SaveButton} />
        </View>
        
    );
};

const styles = StyleSheet.create({
    mainConteiner:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    RalStateCard: {
        padding: 25,
    },
    Titles: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingStart: 20,
    },
    textInput: {
        borderRadius: 20,
        marginTop: 10,
        height: 260,
        width: '80%',
    },
    characterCount: {
        alignSelf: 'flex-end',
        paddingRight: 45,
        marginTop: 5,
        color: 'gray',
    },
    divider: {
        width: '88%',
        padding: 0.5,
        margin: 20,
    },
    starIconFilled: {
        color: 'gold',
        fontSize: 40,
        marginLeft: 2,
    }, 
    starIcon: {
        color: 'gray',
        fontSize: 40,
        marginLeft: 2,
    },
    SaveButton: {
        width: 150,
        marginTop: 40,
    },   
});

export default CalificationInmobiliaria;