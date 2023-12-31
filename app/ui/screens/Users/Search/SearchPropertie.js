import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import CheckBox from '@react-native-community/checkbox';
import { Title, Text, Divider, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';

import I18n from '../../../../assets/strings/I18';
import ImageCustomButton from '../../../components/ImageCustomButton'

import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

const SearchPropertie = () => {
    const navigation = useNavigation();

    const [ventaAlquiler, setVentaAlquiler] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState('');
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [barrioSeleccionado, setBarrioSeleccionado] = useState('');
    const [monedaSeleccionada, setMonedaSeleccionada] = useState('');
    const [ambientesSeleccionados, setAmbientesSeleccionados] = useState('');
    const [dormitoriosSeleccionados, setDormitoriosSeleccionados] = useState('');
    const [banosSeleccionados, setBanosSeleccionados] = useState('');
    const [antiguedadSeleccionada, setAntiguedadSeleccionada] = useState('');

    // Estado para manejar las opciones de Localidad/Barrio
    const [localidadBarrioOpciones, setLocalidadBarrioOpciones] = useState(barrios);

    // Manejador para el cambio de selección de provincia
    const onProvinciaChange = (selectedProvincia) => {
        setProvinciaSeleccionada(selectedProvincia);

        if (selectedProvincia === 'Seleccionar Provincia') {
            setLocalidadBarrioOpciones([]);
            setBarrioSeleccionado(''); // Resetear la selección de barrio/localidad
        } else if (selectedProvincia === 'CABA') {
            setLocalidadBarrioOpciones(barrios);
        } else if (selectedProvincia === 'Buenos Aires') {
            setLocalidadBarrioOpciones(localidades);
        } else {
            setLocalidadBarrioOpciones([]);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

        });
        return unsubscribe;
    }, [navigation]);

    const handleSearch = async () => {
        try {
            let requestBody = {};

            if (ventaAlquiler === 'Venta') {
                requestBody.venta = true;
            } else if (ventaAlquiler === 'Alquiler') {
                requestBody.alquiler = true;
            }

            if (monedaSeleccionada === 'Dolares') {
                requestBody.dolar = true;
            }

            if (tipoPropiedad) {
                // Convierte la selección del usuario en un campo booleano para el backend
                const backendField = tipoPropiedadMapping[tipoPropiedad];
                if (backendField) {
                    requestBody[backendField] = true;
                }
            }

            if (provinciaSeleccionada && provinciaSeleccionada !== 'Seleccionar Provincia') {
                requestBody.provincia = provinciaSeleccionada;
            }

            if (barrioSeleccionado && barrioSeleccionado !== 'Seleccionar Barrio') {
                requestBody.localidad = barrioSeleccionado;
            }

            requestBody.cantambient = ambientesSeleccionados;
            requestBody.cantcuartos = dormitoriosSeleccionados;
            requestBody.cantbaños = banosSeleccionados;
            requestBody.antiguedad = antiguedadSeleccionada;

            requestBody.precioMin = minSliderState;
            requestBody.precioMax = -maxSliderState;

            // Agregar checkboxes si están marcados
            const checkBoxProps = {
                ...amenities,
                ...characteristicsProp,
                ...frenteTypes,
                ...orientTypes,
            };

            for (const [key, value] of Object.entries(checkBoxProps)) {
                if (value) {
                    requestBody[key] = value;
                }
            }
            console.log(requestBody);
            const response = await axios.post(`${SERVER_URL}/api/properties/search`, requestBody);

            if (response.status === 200) {
                // Manejar la respuesta del servidor
                navigation.push(NavigatorConstant.SEARCH_.RESULTS, {
                    propertyIds: response.data
                });
            } else {
                console.error('Respuesta no exitosa:', response);
            }
        } catch (error) {
            console.error('Error en la petición de búsqueda:', error);
        }
    };

    const estado = [
        { key: '', value: 'Seleccionar Operacion' },
        { key: '1', value: 'Venta' },
        { key: '2', value: 'Alquiler' },
    ]
    const tipoProp = [
        { key: '1', value: 'Casa' },
        { key: '2', value: 'Propiedad Horizontal' },
        { key: '3', value: 'Departamento' },
        { key: '4', value: 'Local comercial' },
        { key: '5', value: 'Oficina' },
        { key: '6', value: 'Galpón' },
        { key: '7', value: 'Terreno' },
    ]
    const tipoPropiedadMapping = {
        'Casa': 'house',
        'Propiedad Horizontal': 'ph',
        'Departamento': 'apartment',
        'Local comercial': 'local',
        'Oficina': 'office',
        'Galpón': 'galpon',
        'Terreno': 'territory'
    };

    const provincia = [
        { key: '0', value: 'Seleccionar Provincia' },
        { key: '1', value: 'CABA' },
        { key: '2', value: 'Buenos Aires' },
    ]
    const localidades = [
        { key: '0', value: 'Seleccionar Barrio' },
        { key: '1', value: 'Almirante Brown' },
        { key: '2', value: 'Avellaneda' },
        { key: '3', value: 'Berazategui' },
        { key: '4', value: 'Esteban Echeverría' },
        { key: '5', value: 'Ezeiza' },
        { key: '6', value: 'Florencio Varela' },
        { key: '7', value: 'General San Martín' },
        { key: '8', value: 'Hurlingham' },
        { key: '9', value: 'Ituzaingó' },
        { key: '10', value: 'José C. Paz' },
        { key: '11', value: 'Lanús' },
        { key: '12', value: 'La Matanza' },
        { key: '13', value: 'Lomas de Zamora' },
        { key: '14', value: 'Malvinas Argentinas' },
        { key: '15', value: 'Merlo' },
        { key: '16', value: 'Moreno' },
        { key: '17', value: 'Morón' },
        { key: '18', value: 'Pilar' },
        { key: '19', value: 'Presidente Perón' },
        { key: '20', value: 'Quilmes' },
        { key: '21', value: 'San Fernando' },
        { key: '22', value: 'San Isidro' },
        { key: '23', value: 'San Miguel' },
        { key: '24', value: 'Tigre' },
        { key: '25', value: 'Tres de Febrero' },
        { key: '26', value: 'Vicente López' },
    ];
    const barrios = [
        { key: '0', value: 'Seleccionar Barrio' },
        { key: '1', value: 'Agronomía' },
        { key: '2', value: 'Almagro' },
        { key: '3', value: 'Balvanera' },
        { key: '4', value: 'Barracas' },
        { key: '5', value: 'Belgrano' },
        { key: '6', value: 'Boedo' },
        { key: '7', value: 'Caballito' },
        { key: '8', value: 'Chacarita' },
        { key: '9', value: 'Coghlan' },
        { key: '10', value: 'Colegiales' },
        { key: '11', value: 'Constitución' },
        { key: '12', value: 'Flores' },
        { key: '13', value: 'Floresta' },
        { key: '14', value: 'La Boca' },
        { key: '15', value: 'La Paternal' },
        { key: '16', value: 'Liniers' },
        { key: '17', value: 'Mataderos' },
        { key: '18', value: 'Monte Castro' },
        { key: '19', value: 'Monserrat' },
        { key: '20', value: 'Nueva Pompeya' },
        { key: '21', value: 'Núñez' },
        { key: '22', value: 'Palermo' },
        { key: '23', value: 'Parque Avellaneda' },
        { key: '24', value: 'Parque Chacabuco' },
        { key: '25', value: 'Parque Chas' },
        { key: '26', value: 'Parque Patricios' },
        { key: '27', value: 'Puerto Madero' },
        { key: '28', value: 'Recoleta' },
        { key: '29', value: 'Retiro' },
        { key: '30', value: 'Saavedra' },
        { key: '31', value: 'San Cristóbal' },
        { key: '32', value: 'San Nicolás' },
        { key: '33', value: 'San Telmo' },
        { key: '34', value: 'Vélez Sársfield' },
        { key: '35', value: 'Versalles' },
        { key: '36', value: 'Villa Crespo' },
        { key: '37', value: 'Villa del Parque' },
        { key: '38', value: 'Villa Devoto' },
        { key: '39', value: 'Villa General Mitre' },
        { key: '40', value: 'Villa Lugano' },
        { key: '41', value: 'Villa Luro' },
        { key: '42', value: 'Villa Ortúzar' },
        { key: '43', value: 'Villa Pueyrredón' },
        { key: '44', value: 'Villa Real' },
        { key: '45', value: 'Villa Riachuelo' },
        { key: '46', value: 'Villa Santa Rita' },
        { key: '47', value: 'Villa Soldati' },
        { key: '48', value: 'Villa Urquiza' },
    ];
    const moneda = [
        { key: '1', value: 'Pesos' },
        { key: '2', value: 'Dolares' },
    ]
    const ambientes = [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
        { key: '3', value: '3' },
        { key: '4', value: '4' },
        { key: '5', value: '5' },
    ]
    const dormitorios = [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
        { key: '3', value: '3' },
        { key: '4', value: '4' },
        { key: '5', value: '5' },
    ]
    const baños = [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
        { key: '3', value: '3' },
    ]
    const antiguedad = [
        { key: '1', value: 'A estrenar' },
        { key: '2', value: 'Menos de 10 años' },
        { key: '3', value: 'Entre 10 y 30 años' },
        { key: '4', value: 'Más de 30 años' },
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

    const initialCharacteristics = {
        terraza: false,
        balcon: false,
        cochera: false,
        baulera: false,
    };
    const initialFrenteTypes = {
        frente: false,
        contrafrente: false,
    };
    const initialOrientTypes = {
        orientnorte: false,
        orientsur: false,
        orienteste: false,
        orientOeste: false,
    };

    const [amenities, setAmenities] = useState(initialAmenities);
    const [characteristicsProp, setCharacteristicsProp] = useState(initialCharacteristics);
    const [frenteTypes, setFrenteTypes] = useState(initialFrenteTypes);
    const [orientTypes, setOrientTypes] = useState(initialOrientTypes);

    const handleAmenitiesChange = (amenitiesCh) => {
        const updatedAmenities = { ...amenities };
        updatedAmenities[amenitiesCh] = !amenities[amenitiesCh];
        setAmenities(updatedAmenities);
    };

    //CARACTERISTICAS
    const handleCharacteristicsPropChange = (characteristics) => {
        const updatedcharacteristicsProp = { ...characteristicsProp };
        updatedcharacteristicsProp[characteristics] = !characteristicsProp[characteristics];
        setCharacteristicsProp(updatedcharacteristicsProp);
    };

    //FRENTE O CONTRAFRENTE
    const handleFrenteChange = (frenteType) => {
        const updatedFrente = { ...initialFrenteTypes };
        updatedFrente[frenteType] = !frenteTypes[frenteType];
        setFrenteTypes(updatedFrente);
    };

    //ORIENTACION
    const handleOrientChange = (orientType) => {
        const updatedOrient = { ...initialOrientTypes };
        updatedOrient[orientType] = !orientTypes[orientType];
        setOrientTypes(updatedOrient);
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
                    onPress={handleSearch}
                    style={styles.Button}
                    imageStyle={styles.imageButtonStyle}
                />

                {/* BLOQUE DE LISTAS SELECCIONABLES */}

                <SelectList //Venta/Alquiler
                    boxStyles={styles.listBox} //Asigna estilo al box
                    dropdownStyles={styles.dropdown} //Asigna estilo al dropdown
                    inputStyles={styles.textDropList} //Asigna estilo al texto del contenido
                    dropdownTextStyles={styles.dropdownTextStyles} //Asigna estilo al texto del dropdown
                    setSelected={setVentaAlquiler}
                    data={estado}
                    search={false} //Habilita o no el buscador
                    maxHeight={100} //50 por cada item que haya
                    placeholder={I18n.t('ventaAlquiler')} //Texto a mostrar antes de la selección
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"} //Texto si no encuentra resultados el buscador
                    save='value' //Guarda el value o la key de la lista
                />
                <SelectList //Tipo de propiedad
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setTipoPropiedad}
                    data={tipoProp}
                    search={false}
                    maxHeight={170}
                    placeholder={I18n.t('tipoProp')}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                <SelectList //Provincia
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={onProvinciaChange}
                    data={provincia}
                    search={true}
                    maxHeight={100}
                    placeholder={I18n.t('selecProv')}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                <SelectList //Localidad-Barrio
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setBarrioSeleccionado}
                    data={localidadBarrioOpciones || []}
                    search={true}
                    maxHeight={300}
                    placeholder={I18n.t('selecLoc')}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                <SelectList //Moneda
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setMonedaSeleccionada}
                    data={moneda}
                    search={false}
                    maxHeight={100}
                    placeholder={I18n.t('moneda')}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />

                {/* BLOQUE DE SLIDERS */}

                <Text style={{ fontSize: 20 }}>Mínimo, expresado en miles</Text>

                <Slider
                    style={{ width: 250, height: 40 }}
                    minimumValue={0}
                    maximumValue={1000000}
                    upperLimit={-maxSliderState}
                    value={minSliderState}
                    onValueChange={(value) => setMinSliderState(value)}
                    thumbTintColor='royalblue'
                    minimumTrackTintColor="#4563ac"
                    maximumTrackTintColor="#233460"
                />

                {/* const [minSliderState, setMinSliderState] = useState(0);
                const [maxSliderState, setMaxSliderState] = useState(-1000000); */}

                <TextInput
                    style={styles.textImput}
                    mode='outlined'
                    outlineStyle={{ borderRadius: 20 }}
                    activeOutlineColor='#4363AC'
                    value={minSliderState.toFixed(0)}
                    onChangeText={(value) => setMinSliderState(Number(value))}
                    // onChangeText={(value) => {
                    //     const numericValue = Number(value);
                    //         if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= -maxSliderState) {
                    //             setMinSliderState(numericValue);
                    //         }
                    // }}
                    keyboardType="numeric"
                />

                {/* <Text style={styles.textSlider}>{minSliderState.toFixed(0)}</Text> */}
                {/* toFixed muestra la cantidad de decimales del valor seleccionado en el slider */}

                <Text style={{ fontSize: 20 }}>Máximo, expresado en miles</Text>

                <Slider
                    style={{ width: 250, height: 40 }}
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

                <TextInput
                    style={styles.textImput}
                    mode='outlined'
                    outlineStyle={{ borderRadius: 20 }}
                    activeOutlineColor='#4363AC'
                    value={Math.abs(maxSliderState).toFixed(0)}
                    onChangeText={(value) => setMaxSliderState(Number(value) * -1)}
                    // onChangeText={(value) => {
                    //     const numericValue = Number(value);
                    //         if (!isNaN(numericValue) && numericValue <= 0 && numericValue >= -minSliderState) {
                    //             setMaxSliderState(numericValue * -1);
                    //         }
                    // }}
                    keyboardType="numeric"
                />

                {/* <Text style={styles.textSlider}>{-maxSliderState.toFixed(0)}</Text> */}
                {/* toFixed muestra la cantidad de decimales del valor seleccionado en el slider */}

                {/* BLOQUE DE LISTAS SELECCIONABLES */}

                <SelectList //Ambientes
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setAmbientesSeleccionados}
                    data={ambientes}
                    search={false}
                    maxHeight={200}
                    placeholder={"Ambientes"}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                <SelectList //Dormitorios
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setDormitoriosSeleccionados}
                    data={dormitorios}
                    search={false}
                    maxHeight={200}
                    placeholder={"Dormitorios"}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                <SelectList //Baños
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setBanosSeleccionados}
                    data={baños}
                    search={false}
                    maxHeight={120}
                    placeholder={"Baños"}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                <SelectList //Antigüedad
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setAntiguedadSeleccionada}
                    data={antiguedad}
                    search={false}
                    maxHeight={170}
                    placeholder={"Antigüedad"}
                    searchPlaceholder={"Buscar"}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />

                {/* BLOQUE DE CHECKBOX */}

                <Divider style={styles.divider} />

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

                <Divider style={styles.divider} />

                <Title style={styles.title}>{I18n.t('characteristics')}</Title>

                {Object.keys(characteristicsProp).map((characteristics) => (
                    <View style={styles.checkboxRow} key={characteristics}>
                        <Text style={styles.checkboxText}>{I18n.t(characteristics)}</Text>
                        <CheckBox
                            value={characteristicsProp[characteristics]}
                            onValueChange={() => handleCharacteristicsPropChange(characteristics)}
                            tintColors={{ true: '#4363AC', false: '#49454F' }}
                        />
                    </View>
                ))}

                <Divider style={styles.divider} />

                {Object.keys(frenteTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={frenteTypes[type]}
                            onValueChange={() => handleFrenteChange(type)}
                            tintColors={{ true: '#4363AC', false: '#49454F' }}
                        />
                    </View>
                ))}

                <Divider style={styles.divider} />

                {Object.keys(orientTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={orientTypes[type]}
                            onValueChange={() => handleOrientChange(type)}
                            tintColors={{ true: '#4363AC', false: '#49454F' }}
                        />
                    </View>
                ))}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        width: '100%', // Asegúrate de que ocupe el ancho completo
        alignItems: 'center', // Centra verticalmente
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    Button: {
        width: 200,
        marginTop: 30,
        marginBottom: 40,
    },
    imageButtonStyle: {
        height: 25,
        width: 38,
        marginLeft: 15,
        marginRight: 15,
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
    textSlider: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 100,
        textAlign: 'center',
        backgroundColor: '#E0E4F2',
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
        //marginBottom:20
    },
    checkboxText: {
        fontSize: 16,
    },
    divider: {
        marginTop: 5,
        marginBottom: 5,
        height: 2
    },
    textImput: {
        //marginTop: 10,
        // marginLeft: 20,
        // marginRight: 20,
        marginBottom: 10,
        width: 100,
        height: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default SearchPropertie;
