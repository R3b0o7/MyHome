import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import CheckBox from '@react-native-community/checkbox'; 
import { Title, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import Slider from '@react-native-community/slider';

import I18n from '../../../../assets/strings/I18';
import ImageCustomButton from '../../../components/ImageCustomButton'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

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

    //POR QUE HAY UN LOGIN?
    const handleLogin = async () => {
        navigation.push(NavigatorConstant.SEARCH_.RESULTS);
    };

    //CATEGORIAS
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
    const moneda = [
        {key:'1', value:'Pesos'},
        {key:'2', value:'Dolares'},
    ]
    const ambientes = [
        {key:'1', value:'1'},
        {key:'2', value:'2'},
        {key:'3', value:'3'},
        {key:'4', value:'4'},
        {key:'5', value:'5'},
    ]
    const dormitorios = [
        {key:'1', value:'1'},
        {key:'2', value:'2'},
        {key:'3', value:'3'},
        {key:'4', value:'4'},
        {key:'5', value:'5'},
    ]
    const baños = [
        {key:'1', value:'1'},
        {key:'2', value:'2'},
        {key:'3', value:'3'},
    ]
    const antiguedad = [
        {key:'1', value:'A estrenar'},
        {key:'2', value:'Menos de 10 años'},
        {key:'3', value:'Entre 10 y 30 años'},
        {key:'4', value:'Más de 30 años'},
    ]
    //SLIDER
    const [minSliderState, setMinSliderState] = useState(0);
    const [maxSliderState, setMaxSliderState] = useState(-1000000);

    //AMENITIES
    const initialAmenities = {
        sum: false,
        pool: false,
        quincho: false,
        solarium: false,
        sauna: false,
        roomgames: false,
        calefaccion: false,
        coworking: false,
        microcine: false,
    };

    const [amenities, setAmenities] = useState(initialAmenities);
    
    const handleAmenitiesChange = (amenitiesCh) => {
        const updatedAmenities = { ...amenities };
        updatedAmenities[amenitiesCh] = !amenities[amenitiesCh];
        setAmenities(updatedAmenities);
    };

    return (
        <View style={styles.container}>
            <ScrollView 
                bounces={false}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                >
                <ImageCustomButton 
                    title={I18n.t('search')}
                    imageSource={require('../../../../assets/images/Icons/lightMode/serch.png')} 
                    color="blue" 
                    onPress={handleLogin} 
                    style={styles.Button}
                    imageStyle={styles.imageButtonStyle}
                />

                <SelectList //Venta/Alquiler
                    boxStyles= {styles.listBox} //Asigna estilo al box
                    dropdownStyles= {styles.dropdown} //Asigna estilo al dropdown
                    inputStyles= {styles.textDropList} //Asigna estilo al texto del contenido
                    dropdownTextStyles={styles.dropdownTextStyles} //Asigna estilo al texto del dropdown
                    setSelected= {setCategory}
                    data= {estado}
                    search={false} //Habilita o no el buscador
                    maxHeight={100} //50 por cada item que haya
                    placeholder= {"Venta/Alquiler"} //Texto a mostrar antes de la selección
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} //Texto si no encuentra resultados el buscador
                    save= 'value' //Guarda el value o la key de la lista
                />
                <SelectList //Tipo de propiedad
                    boxStyles= {styles.listBox} 
                    dropdownStyles= {styles.dropdown}
                    inputStyles= {styles.textDropList} 
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected= {setCategory}
                    data= {tipoProp}
                    search={false} 
                    maxHeight={170} 
                    placeholder= {"Tipo de propiedad"} 
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} 
                    save= 'value' 
                />
                <SelectList //Provincia-Localidad-Barrio
                    boxStyles= {styles.listBox} 
                    dropdownStyles= {styles.dropdown}
                    inputStyles= {styles.textDropList} 
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected= {setCategory}
                    data= {barrios}
                    search={true} 
                    maxHeight={300} 
                    placeholder= {"Provincia/Localidad/Barrio"} 
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} 
                    save= 'value' 
                />
                <SelectList //Moneda
                    boxStyles= {styles.listBox} 
                    dropdownStyles= {styles.dropdown}
                    inputStyles= {styles.textDropList} 
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected= {setCategory}
                    data= {moneda}
                    search={false} 
                    maxHeight={170} 
                    placeholder= {"Moneda"} 
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} 
                    save= 'value' 
                />
                
                <Text style={{fontSize:20}}>Mínimo, expresado en miles</Text>

                <Slider
                    style={{width: 250, height: 40}}
                    minimumValue={0}
                    maximumValue={1000000}
                    upperLimit={-maxSliderState}
                    value={minSliderState}
                    onValueChange={(value) => setMinSliderState(value)}
                    thumbTintColor='royalblue'
                    minimumTrackTintColor="#4563ac"
                    maximumTrackTintColor="#233460"
                />

                <Text style={styles.textSlider}>{minSliderState.toFixed(0)}</Text> 
                {/* toFixed muestra la cantidad de decimales del valor seleccionado en el slider */}

                <Text style={{fontSize:20}}>Máximo, expresado en miles</Text>

                <Slider
                    style={{width: 250, height: 40}}
                    minimumValue={-1000000}
                    maximumValue={0}
                    upperLimit={-minSliderState}
                    value={maxSliderState}
                    inverted
                    onValueChange={(value) => setMaxSliderState(value)}
                    thumbTintColor='royalblue'
                    minimumTrackTintColor="#4563ac"
                    maximumTrackTintColor="#acb4cc"
                />

                <Text style={styles.textSlider}>{-maxSliderState.toFixed(0)}</Text> 
                {/* toFixed muestra la cantidad de decimales del valor seleccionado en el slider */}

                <SelectList //Ambientes
                    boxStyles= {styles.listBox} 
                    dropdownStyles= {styles.dropdown}
                    inputStyles= {styles.textDropList} 
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected= {setCategory}
                    data= {ambientes}
                    search={false} 
                    maxHeight={200} 
                    placeholder= {"Ambientes"} 
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} 
                    save= 'value' 
                />
                <SelectList //Dormitorios
                    boxStyles= {styles.listBox} 
                    dropdownStyles= {styles.dropdown}
                    inputStyles= {styles.textDropList} 
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected= {setCategory}
                    data= {dormitorios}
                    search={false} 
                    maxHeight={200} 
                    placeholder= {"Dormitorios"} 
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} 
                    save= 'value' 
                />
                <SelectList //Baños
                    boxStyles= {styles.listBox} 
                    dropdownStyles= {styles.dropdown}
                    inputStyles= {styles.textDropList} 
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected= {setCategory}
                    data= {baños}
                    search={false} 
                    maxHeight={120} 
                    placeholder= {"Baños"} 
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} 
                    save= 'value' 
                />
                <SelectList //Antigüedad
                    boxStyles= {styles.listBox} 
                    dropdownStyles= {styles.dropdown}
                    inputStyles= {styles.textDropList} 
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected= {setCategory}
                    data= {antiguedad}
                    search={false} 
                    maxHeight={170} 
                    placeholder= {"Antigüedad"} 
                    searchPlaceholder= {"Buscar"}
                    notFoundText= {"No se encontro resultado"} 
                    save= 'value' 
                />

                <Title style={styles.title}>{I18n.t('amenities')}</Title>

                {Object.keys(amenities).map((amenitiesCh) => (
                    <View style={styles.checkboxRow} key={amenitiesCh}>
                        <Text style={styles.checkboxText}>{I18n.t(amenitiesCh)}</Text>
                        <CheckBox
                            value={amenities[amenitiesCh]}
                            onValueChange={() => handleAmenitiesChange(amenitiesCh)}
                            tintColors={{ true: '#4363AC', false: '#49454F' }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContent:{
        width: '100%', // Asegúrate de que ocupe el ancho completo
        alignItems: 'center', // Centra verticalmente
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    Button:{
        width: 200,
        marginTop: 30,
        marginBottom: 40, 
    },
    imageButtonStyle: {
        height:25,
        width:38,
        marginLeft: 15,
        marginRight: 15,
    },
    listBox: {
        width:300,
        marginTop:10,
        marginBottom:10,
        backgroundColor: '#E0E4F2',
        borderRadius: 100,
        borderColor: '#E0E4F2',
    },
    dropdown: {
        backgroundColor: '#E0E4F2',
        borderColor: '#E0E4F2',
    },
    textDropList:{
        color: 'black'
    },
    dropdownTextStyles:{
        color: 'black'
    },
    textSlider: {
        fontSize:18, 
        fontWeight: 'bold',
        width: 100,
        textAlign: 'center',
        backgroundColor:'#E0E4F2',
        borderRadius: 10,
        marginBottom: 20
    },
    checkboxRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 250,
        // marginLeft: 40,
        // marginRight: 40,
    },
    checkboxText: {
        fontSize: 16,
    },
});

export default SearchPropertie;
