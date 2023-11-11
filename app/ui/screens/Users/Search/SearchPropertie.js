import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

import I18n from '../../../../assets/strings/I18';
import CustomButton from '../../../components/CustomButton';


const SearchPropertie = () => {
    const navigation = useNavigation();

    const [userProperties, setUserProperties] = useState([]); // Estado para almacenar las propiedades del usuario

   /* const fetchUserProperties = async () => {
        // Obtén el token de AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');

        // Realiza una solicitud GET para obtener las propiedades del usuario desde tu backend
        try {
            const response = await axios.get(`${SERVER_URL}/api/properties/user-properties`, {
                headers: {
                    Authorization: authToken,
                }
            });
            if (response.status === 200) {
                setUserProperties(response.data);
            }
        } catch (error) {
            console.error('Error al obtener las propiedades del usuario:', error);
        }
    };*/

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Este código se ejecutará cada vez que la pantalla esté en primer plano
           // fetchUserProperties();
        });
        return unsubscribe;
    }, [navigation]);

    const handleLogin = async () => {
        navigation.push(NavigatorConstant.SEARCH_.RESULTS);
    };
    
    const [category, setCategory] =  useState([]);

    const estado = [
        {key:'1', value:'Venta'},
        {key:'2', value:'Alquiler'},
    ]
    const tipoProp = [
        {key:'1', value:'Departamento'},
        {key:'2', value:'Propiedad Horizontal'},
        {key:'3', value:'Casa'},
        {key:'4', value:'Local comercial'},
    ]
    const barrios = [
        {key:'1', value:'Agronomía'},
        {key:'2', value:'Almagro'},
        {key:'3', value:'Balvanera'},
        {key:'4', value:'Barracas'},
        {key:'5', value:'Belgrano'},
        {key:'6', value:'Boedo'},
        {key:'7', value:'Caballito'},
        {key:'8', value:'Chacarita'},
        {key:'9', value:'Coghlan'},
        {key:'10', value:'Colegiales'},
        {key:'11', value:'Constitución'},
        {key:'12', value:'Flores'},
        {key:'13', value:'Floresta'},
        {key:'14', value:'La Boca'},
        {key:'15', value:'La Paternal'},
        {key:'16', value:'Liniers'},
        {key:'17', value:'Mataderos'},
        {key:'18', value:'Monte Castro'},
        {key:'19', value:'Nueva Pompeya'},
        {key:'20', value:'Núñez'},
        {key:'21', value:'Palermo'},
        {key:'22', value:'Parque Avellaneda'},
        {key:'23', value:'Parque Chacabuco'},
        {key:'24', value:'Parque Chas'},
        {key:'25', value:'Parque Patricios'},
        {key:'26', value:'Puerto Madero'},
        {key:'27', value:'Recoleta'},
        {key:'28', value:'Retiro'},
        {key:'29', value:'Saavedra'},
        {key:'30', value:'San Cristóbal'},
        {key:'31', value:'San Nicolás'},
        {key:'32', value:'San Telmo'},
        {key:'33', value:'Vélez Sársfield'},
        {key:'34', value:'Versalles'},
        {key:'35', value:'Villa Crespo'},
        {key:'36', value:'Villa del Parque'},
        {key:'37', value:'Villa Devoto'},
        {key:'38', value:'Villa General Mitre'},
        {key:'39', value:'Villa Lugano'},
        {key:'40', value:'Villa Luro'},
        {key:'41', value:'Villa Ortúzar'},
        {key:'42', value:'Villa Pueyrredón'},
        {key:'43', value:'Villa Real'},
        {key:'44', value:'Villa Riachuelo'},
        {key:'45', value:'Villa Santa Rita'},
        {key:'46', value:'Villa Soldati'},
        {key:'47', value:'Villa Urquiza'},
    ]

    return (

        <View style={styles.container}>
            <Text>PANTALLA DE BUSQUEDA DE PROPIEDADES</Text>

            <CustomButton title='BOTON BUSCAR' color="blue" onPress={handleLogin} style={styles.loginButton} />

            <SelectList
                boxStyles= {styles.listBox} //Asigna estilo al box
                dropdownStyles= {styles.dropdown} //Asigna estilo al dropdown
                setSelected= {setCategory}
                data= {estado}
                search={false} //Habilita o no el buscador
                maxHeight={100} //50 por cada item que haya
                placeholder= {"Venta/Alquiler"} //Texto a mostrar antes de la selección
                searchPlaceholder= {"Buscar"}
                notFoundText= {"No se encontro resultado"} //Texto si no encuentra resultados el buscador
                save= 'value' //Guarda el value o la key de la lista
            />
            <SelectList
                boxStyles= {styles.listBox} //Asigna estilo al box
                dropdownStyles= {styles.dropdown} //Asigna estilo al dropdown
                setSelected= {setCategory}
                data= {tipoProp}
                search={false} //Habilita o no el buscador
                maxHeight={170} //50 por cada item que haya
                placeholder= {"Tipo de propiedad"} //Texto a mostrar antes de la selección
                searchPlaceholder= {"Buscar"}
                notFoundText= {"No se encontro resultado"} //Texto si no encuentra resultados el buscador
                save= 'value' //Guarda el value o la key de la lista
            />
             <SelectList
                boxStyles= {styles.listBox} //Asigna estilo al box
                dropdownStyles= {styles.dropdown} //Asigna estilo al dropdown
                setSelected= {setCategory}
                data= {barrios}
                search={true} //Habilita o no el buscador
                maxHeight={300} //50 por cada item que haya
                placeholder= {"Provincia/Localidad/Barrio"} //Texto a mostrar antes de la selección
                searchPlaceholder= {"Buscar"}
                notFoundText= {"No se encontro resultado"} //Texto si no encuentra resultados el buscador
                save= 'value' //Guarda el value o la key de la lista
            />

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    listBox: {
        width:300,
        marginTop:20,
        marginBottom:10,
        backgroundColor: '#E0E4F2',
        borderRadius: 100,
        borderColor: '#E0E4F2',
    },
    dropdown: {
        backgroundColor: '#E0E4F2',
        borderColor: '#E0E4F2',
    }
});

export default SearchPropertie;
