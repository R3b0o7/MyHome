import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { Title, Text } from 'react-native-paper';
import I18n from '../../../../assets/strings/I18';
import CheckBox from '@react-native-community/checkbox';
import CustomSwitch from '../../../components/CustomSwitch';
import UpdateImageModal from '../../../components/UpdateImageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../../../../config/config';
import axios from 'axios';
import { CLOUD_NAME } from '@env';
import ImagePicker from 'react-native-image-crop-picker';

const PropertiesToRegister = () => {
    const navigation = useNavigation();

    const [updateImageModalVisible, setUpdateImageModalVisible] = useState(false);

    const openUpdateImageModal = () => {
        setUpdateImageModalVisible(true);
    };

    const closeUpdateImageModal = () => {
        setUpdateImageModalVisible(false);
    };
    const hasCustomErrors = (text) => {
        const isNumber = /^[0-9]+$/.test(text); //SOLO RECIBA NUMEROS
        return !isNumber;
    };



    //API GOOGLE

    const getCoordinatesFromAddress = async (address) => {
        try {
            // Reemplaza 'TU_CLAVE_DE_API' con tu propia clave de API de Google Maps
            const apiKey = 'AIzaSyAPV6YxGL3i8jsUIqb2dyyprRCDuWRiH1I';
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

            const response = await axios.get(apiUrl);

            if (response.data.status === 'OK' && response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                return { latitude, longitude };
            } else {
                throw new Error('No se pudieron obtener las coordenadas de la dirección.');
            }
        } catch (error) {
            console.error('Error al obtener las coordenadas:', error);
            throw error;
        }
    };

    const initialPropertyTypes = {
        house: false,
        ph: false,
        apartment: false,
        local: false,
        office: false,
        galpon: false,
        territory: false,
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

    const initialState = {
        alquiler: false,
        venta: false,
        reservada: false,
        alquiladaVendida: false,
    };

    const [textInputData, setUbicacionData] = useState({
        calle: '',
        numero: '',
        piso: '',
        departamento: '',
        // localidad: '',
        // provincia: '',
        //pais: '',
        coordenadas: '',
        m2cubiert: '',
        m2semidescubiert: '',
        m2descubiert: '',
        //cantambient: '',
        //cantcuartos: '',
        //cantbaños: '',
        antiguedad: '',
        descripcion: '',
        precio: '',
        expensas: '',
    });

    const pais = [
        { key: '1', value: 'Argentina' },
    ]

    const provincia = [
        { key: '1', value: 'CABA' },
        { key: '2', value: 'Buenos Aires' },
    ]
    const localidades = [
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
        { key: '19', value: 'Nueva Pompeya' },
        { key: '20', value: 'Núñez' },
        { key: '21', value: 'Palermo' },
        { key: '22', value: 'Parque Avellaneda' },
        { key: '23', value: 'Parque Chacabuco' },
        { key: '24', value: 'Parque Chas' },
        { key: '25', value: 'Parque Patricios' },
        { key: '26', value: 'Puerto Madero' },
        { key: '27', value: 'Recoleta' },
        { key: '28', value: 'Retiro' },
        { key: '29', value: 'Saavedra' },
        { key: '30', value: 'San Cristóbal' },
        { key: '31', value: 'San Nicolás' },
        { key: '32', value: 'San Telmo' },
        { key: '33', value: 'Vélez Sársfield' },
        { key: '34', value: 'Versalles' },
        { key: '35', value: 'Villa Crespo' },
        { key: '36', value: 'Villa del Parque' },
        { key: '37', value: 'Villa Devoto' },
        { key: '38', value: 'Villa General Mitre' },
        { key: '39', value: 'Villa Lugano' },
        { key: '40', value: 'Villa Luro' },
        { key: '41', value: 'Villa Ortúzar' },
        { key: '42', value: 'Villa Pueyrredón' },
        { key: '43', value: 'Villa Real' },
        { key: '44', value: 'Villa Riachuelo' },
        { key: '45', value: 'Villa Santa Rita' },
        { key: '46', value: 'Villa Soldati' },
        { key: '47', value: 'Villa Urquiza' },
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

    const [propertyTypes, setPropertyTypes] = useState(initialPropertyTypes);
    const [characteristicsProp, setCharacteristicsProp] = useState(initialCharacteristics);
    const [frenteTypes, setFrenteTypes] = useState(initialFrenteTypes);
    const [orientTypes, setOrientTypes] = useState(initialOrientTypes);
    const [amenities, setAmenities] = useState(initialAmenities);
    const [stateTypes, setStateTypes] = useState(initialState);
    const [isDollar, setIsDollar] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [barrioSeleccionado, setBarrioSeleccionado] = useState('');
    const [paisSeleccionado, setPaisSeleccionado] = useState('');
    const [ambientesSeleccionados, setAmbientesSeleccionados] = useState('');
    const [dormitoriosSeleccionados, setDormitoriosSeleccionados] = useState('');
    const [banosSeleccionados, setBanosSeleccionados] = useState('');

    // Estado para manejar las opciones de Localidad/Barrio
    const [localidadBarrioOpciones, setLocalidadBarrioOpciones] = useState(barrios);

    // Manejador para el cambio de selección de provincia
    const onProvinciaChange = (selectedProvincia) => {
        setProvinciaSeleccionada(selectedProvincia);

        // Cambiar las opciones de localidad/barrio según la provincia
        if (selectedProvincia === 'CABA') {
            setLocalidadBarrioOpciones(barrios);
        } else if (selectedProvincia === 'Buenos Aires') {
            setLocalidadBarrioOpciones(localidades);
        } else {
            setLocalidadBarrioOpciones([]);
        }
    };

    //TIPO DE PROPIEDAD
    const handlePropertyTypeChange = (propertyType) => {
        const updatedPropertyTypes = { ...initialPropertyTypes };
        updatedPropertyTypes[propertyType] = !propertyTypes[propertyType];
        setPropertyTypes(updatedPropertyTypes);
    };
    //ESTADO DE LA PROPIEDAD
    const handleStateChange = (stateType) => {
        const updateState = { ...initialState };
        updateState[stateType] = !stateTypes[stateType];
        setStateTypes(updateState);
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

    //AMENITIES
    const handleAmenitiesChange = (amenitiesCh) => {
        const updatedAmenities = { ...amenities };
        updatedAmenities[amenitiesCh] = !amenities[amenitiesCh];
        setAmenities(updatedAmenities);
    };

    const handleDollarChange = (value) => {
        setIsDollar(value);
    };

    //MANEJO DE FOTOS

    const handleUploadPhoto = () => {
        ImagePicker.openPicker({
            multiple: true,
            // ... otras opciones ...
        }).then(images => {
            // Solo almacenar la información de la imagen, no subirla
            const imageInfo = images.map(image => ({
                uri: image.path,
                type: image.mime,
                name: image.filename || `image-${Date.now()}`
            }));

            setImageUrls(imageInfo);
        }).catch(error => {
            console.log('Error al seleccionar imágenes:', error);
        });
    };

    const uploadImages = async () => {
        const uploadedUrls = [];

        for (const image of imageUrls) {
            const formData = new FormData();
            formData.append('file', {
                uri: image.uri,
                type: image.type,
                name: image.name,
            });
            formData.append('upload_preset', 'Myhome');

            try {
                const uploadResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                uploadedUrls.push(uploadResponse.data.secure_url);
            } catch (error) {
                console.log('Error al subir la imagen:', error);
                throw error; // Si una imagen falla, puedes decidir si continuar o detener todo el proceso
            }
        }

        return uploadedUrls;
    };

    const handleUploadVideo = () => {

    };

    // Función para enviar la solicitud de registro
    const handleRegister = async () => {
        try {

            //validacion para que no este vacio
            const emptyFields = [];

            for (const key in textInputData) {
                if (key !== 'coordenadas' && textInputData[key] === '') {
                    emptyFields.push(key);
                }
            }

            if (emptyFields.length > 0) {
                alert(`Los campos (${emptyFields.join(', ')}) están vacíos. Por favor, completa todos los campos.`);
                return;
            }


            const apiUrl = `${SERVER_URL}/api/properties/register`;

            // Obtiene el token de AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            //obtener coordenadas

            // Uso de la función para obtener coordenadas desde una dirección
            const address = `${textInputData.calle} ${textInputData.numero}, ${provinciaSeleccionada}, ${textInputData.pais}`;
            const coordinatesdata = await getCoordinatesFromAddress(address);
            const coordinates = `${coordinatesdata.latitude}, ${coordinatesdata.longitude}`;

            //Sube las fotos a cloudinary
            const photoUrls = await uploadImages();


            // Define los datos a enviar en la solicitud
            const propertyData = {

                calle: textInputData.calle,
                numero: textInputData.numero,
                piso: textInputData.piso,
                departamento: textInputData.departamento,
                localidad: barrioSeleccionado,
                pais: paisSeleccionado,
                provincia: provinciaSeleccionada,
                coordenadas: coordinates,
                house: propertyTypes.house,
                ph: propertyTypes.ph,
                apartment: propertyTypes.apartment,
                local: propertyTypes.local,
                office: propertyTypes.office,
                galpon: propertyTypes.territory,
                m2cubiert: textInputData.m2cubiert,
                m2semidescubiert: textInputData.m2semidescubiert,
                m2descubiert: textInputData.m2descubiert,
                cantambient: ambientesSeleccionados,
                cantcuartos: dormitoriosSeleccionados,
                cantbaños: banosSeleccionados,
                terraza: characteristicsProp.terraza,
                balcon: characteristicsProp.balcon,
                cochera: characteristicsProp.cochera,
                baulera: characteristicsProp.baulera,
                frente: frenteTypes.frente,
                contrafrente: frenteTypes.contrafrente,
                orientnorte: orientTypes.orientnorte,
                orientsur: orientTypes.orientsur,
                orienteste: orientTypes.orienteste,
                orientOeste: orientTypes.orientOeste,
                antiguedad: textInputData.antiguedad,
                sum: amenities.sum,
                pool: amenities.pool,
                quincho: amenities.quincho,
                solarium: amenities.solarium,
                sauna: amenities.sauna,
                roomgames: amenities.roomgames,
                calefaccion: amenities.calefaccion,
                coworking: amenities.coworking,
                microcine: amenities.microcine,
                descripcion: textInputData.descripcion,
                photos: photoUrls,
                videos: '',
                precio: textInputData.precio,
                dolar: isDollar,
                expensas: textInputData.expensas,
                alquiler: stateTypes.alquiler,
                venta: stateTypes.venta,
                reservada: stateTypes.reservada,
                alquiladaVendida: stateTypes.alquiladaVendida,

            };

            // Realiza la solicitud POST al servidor
            const response = await axios.post(apiUrl, propertyData, {
                headers: {
                    Authorization: token, // Incluye el token en la cabecera de la solicitud
                },
            });

            // Muestra una alerta de registro exitoso
            alert('Propiedad creada exitosamente!');

            navigation.goBack();
        } catch (error) {
            //console.error('Error al registrar la propiedad:', error);
            // Muestra una alerta de error en el registro
            alert('Error al registrar la propiedad');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Title style={styles.title}>{I18n.t('location')}</Title>

                <CustomTextInput
                    label={I18n.t('address')}
                    value={textInputData.calle}
                    onChangeText={(text) => {
                        // Convierte la primera letra en mayúscula y el resto en minúsculas
                        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                        setUbicacionData({ ...textInputData, calle: text });
                    }}
                />
                <CustomTextInput
                    label={I18n.t('streetNumber')}
                    value={textInputData.numero}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, numero: numericText });
                    }}
                    keyboardType="numeric"
                />
                <CustomTextInput
                    label={I18n.t('floor')}
                    value={textInputData.piso}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, piso: numericText });
                    }}
                    keyboardType="numeric"
                />
                <CustomTextInput
                    label={I18n.t('apartment')}
                    value={textInputData.departamento}
                    onChangeText={(text) => setUbicacionData({ ...textInputData, departamento: text })}
                />
                <SelectList //Pais
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setPaisSeleccionado}
                    data={pais}
                    search={true}
                    maxHeight={100}
                    placeholder={I18n.t('country')}
                    searchPlaceholder={I18n.t('search')}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                {/*<CustomTextInput
                    label={I18n.t('country')}
                    value={textInputData.pais}
                    onChangeText={(text) => {
                        // Convierte la primera letra en mayúscula y el resto en minúsculas
                        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                        setUbicacionData({ ...textInputData, pais: text });
                    }}
                />*/}
                <SelectList //Provincia
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={onProvinciaChange}
                    data={provincia}
                    search={true}
                    maxHeight={100}
                    placeholder={I18n.t('state')}
                    searchPlaceholder={I18n.t('search')}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                {/*<CustomTextInput
                    label={I18n.t('state')}
                    value={textInputData.provincia}
                    onChangeText={(text) => {
                        // Convierte la primera letra en mayúscula y el resto en minúsculas
                        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                        setUbicacionData({ ...textInputData, provincia: text });
                    }}
                />*/}
                <SelectList //Localidad-Barrio
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setBarrioSeleccionado}
                    data={localidadBarrioOpciones}
                    search={true}
                    maxHeight={300}
                    placeholder={I18n.t('city')}
                    searchPlaceholder={I18n.t('search')}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                {/*<CustomTextInput
                    label={I18n.t('city')}
                    value={textInputData.localidad}
                    onChangeText={(text) => {
                        // Convierte la primera letra en mayúscula y el resto en minúsculas
                        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                        setUbicacionData({ ...textInputData, localidad: text });
                    }}
                />*/}
                <CustomTextInput
                    label={I18n.t('latLong')}
                    disabled={true}
                    value={textInputData.coordenadas}
                    onChangeText={(text) => setUbicacionData({ ...textInputData, coordenadas: text })}
                />

                <Title style={styles.title}>{I18n.t('kindOfProperty')}</Title>

                {Object.keys(propertyTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={propertyTypes[type]}
                            onValueChange={() => handlePropertyTypeChange(type)}
                            tintColors={{ true: '#4363AC', false: '#49454F' }}
                        />
                    </View>
                ))}

                <Title style={styles.title}>{I18n.t('characteristics')}</Title>

                <CustomTextInput
                    label={I18n.t('m2cubiert')}
                    value={textInputData.m2cubiert}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, m2cubiert: numericText });
                    }}
                    keyboardType="numeric"
                />
                <CustomTextInput
                    label={I18n.t('m2semidescubiert')}
                    value={textInputData.m2semidescubiert}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, m2semidescubiert: numericText });
                    }}
                    keyboardType="numeric"
                />
                <CustomTextInput
                    label={I18n.t('m2descubiert')}
                    value={textInputData.m2descubiert}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, m2descubiert: numericText });
                    }}
                    keyboardType="numeric"
                />
                <SelectList //Ambientes
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setAmbientesSeleccionados}
                    data={ambientes}
                    search={false}
                    maxHeight={200}
                    placeholder={I18n.t('cantambient')}
                    searchPlaceholder={I18n.t('search')}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />
                {/*<CustomTextInput
                    label={I18n.t('cantambient')}
                    value={textInputData.cantambient}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, cantambient: numericText });
                    }}
                    keyboardType="numeric"
                />*/}
                <SelectList //Dormitorios
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setDormitoriosSeleccionados}
                    data={dormitorios}
                    search={false}
                    maxHeight={200}
                    placeholder={I18n.t('cantcuartos')}
                    searchPlaceholder={I18n.t('search')}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />

                {/*<CustomTextInput
                    label={I18n.t('cantcuartos')}
                    value={textInputData.cantcuartos}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, cantcuartos: numericText });
                    }}
                    keyboardType="numeric"
                />*/}

                <SelectList //Baños
                    boxStyles={styles.listBox}
                    dropdownStyles={styles.dropdown}
                    inputStyles={styles.textDropList}
                    dropdownTextStyles={styles.dropdownTextStyles}
                    setSelected={setBanosSeleccionados}
                    data={baños}
                    search={false}
                    maxHeight={120}
                    placeholder={I18n.t('cantbaños')}
                    searchPlaceholder={I18n.t('search')}
                    notFoundText={"No se encontro resultado"}
                    save='value'
                />


                {/*<CustomTextInput
                    label={I18n.t('cantbaños')}
                    value={textInputData.cantbaños}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, cantbaños: numericText });
                    }}
                    keyboardType="numeric"
                />*/}

                <Text />

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

                <Text />

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

                <Text />

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

                <Text />

                <CustomTextInput
                    label={I18n.t('antiguedad')}
                    value={textInputData.antiguedad}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, antiguedad: numericText });
                    }}
                    keyboardType="numeric"
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

                <Text />

                <CustomTextInput
                    label={I18n.t('description')}
                    value={textInputData.descripcion}
                    onChangeText={(text) => {
                        // Convierte la primera letra en mayúscula y el resto en minúsculas
                        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                        setUbicacionData({ ...textInputData, descripcion: text });
                    }}
                />
                <Text />

                <CustomButton title={I18n.t('uploadphoto')} onPress={handleUploadPhoto} style={styles.uploadphotoButton} />
                <UpdateImageModal visible={updateImageModalVisible} onClose={closeUpdateImageModal} />
                <Title style={styles.titleUpload}>{I18n.t('requeredPhoto')}</Title>

                {
                    imageUrls.length > 0 && (
                        <View style={styles.selectedImagesContainer}>
                            {imageUrls.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: image.uri }}
                                        style={styles.image}
                                    />
                                </View>
                            ))}
                        </View>
                    )
                }

                <CustomButton title={I18n.t('uploadVideo')} onPress={openUpdateImageModal} style={styles.uploadphotoButton} />
                <Text />
                <CustomTextInput
                    label={I18n.t('precioVentaAlqui')}
                    value={textInputData.precio}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, precio: numericText });
                    }}
                    keyboardType="numeric"
                />

                <Title style={styles.title}>
                    PESO
                    <CustomSwitch
                        value={isDollar}
                        onValueChange={handleDollarChange}
                    />
                    DOLAR
                </Title>

                <CustomTextInput
                    label={I18n.t('expenses')}
                    value={textInputData.expensas}
                    onChangeText={(text) => {
                        // Filtra el texto para asegurarse de que solo contenga números
                        const numericText = text.replace(/[^0-9]/g, ''); // Esto eliminará cualquier carácter que no sea un número
                        setUbicacionData({ ...textInputData, expensas: numericText });
                    }}
                    keyboardType="numeric"
                />

                <Title style={styles.title}>{I18n.t('statePropertie')}</Title>

                {Object.keys(stateTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={stateTypes[type]}
                            onValueChange={() => handleStateChange(type)}
                            tintColors={{ true: '#4363AC', false: '#49454F' }}
                        />
                    </View>
                ))}

                <CustomButton title={I18n.t('postPropertie')} onPress={handleRegister} style={styles.registerButton} />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {},
    title: {
        fontSize: 20,
        marginVertical: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    titleUpload: {
        fontSize: 10,
        textAlign: 'center',
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
    registerButton: {
        marginTop: 100,
        margin: 70,
        marginLeft: 120,
        marginRight: 120,
    },
    uploadphotoButton: {
        marginLeft: 150,
        marginRight: 150,
    },
    checkboxTitle: {
        fontSize: 18,
        marginVertical: 10,
        marginLeft: 40,
        marginRight: 40,
        fontWeight: 'bold',
    },
    selectedImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    imageContainer: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
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

export default PropertiesToRegister;
