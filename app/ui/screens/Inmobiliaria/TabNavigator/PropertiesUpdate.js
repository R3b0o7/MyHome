import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Video from 'react-native-video';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Title, Text, Divider } from 'react-native-paper';
import I18n from '../../../../assets/strings/I18';
import CheckBox from '@react-native-community/checkbox';
import CustomSwitch from '../../../components/CustomSwitch';
import UpdateImageModal from '../../../components/UpdateImageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../../../../config/config';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { API_KEY, CLOUD_NAME, API_SECRET } from '@env';
import { SelectList } from 'react-native-dropdown-select-list';

const PropertiesUpdate = ({ route }) => {

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [videoUrls, setVideoUrls] = useState([]);

    //API GOOGLE

    const getCoordinatesFromAddress = async (address) => {
        try {
            // Reemplaza 'TU_CLAVE_DE_API' con tu propia clave de API de Google Maps
            const apiKey = 'AIzaSyD1leVNZKgKkjTr_jNyyx_6zPH0M2DJ_9g';
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


    const fetchPropertyData = async () => {
        try {
            const authToken = await AsyncStorage.getItem('authToken');

            if (!authToken) {
                console.error('Token de autorización no encontrado en AsyncStorage');
                return;
            }

            const propertyId = route.params.propertyId;
            const response = await axios.get(`${SERVER_URL}/api/properties/${propertyId}`, {
                headers: {
                    Authorization: authToken,
                }
            });

            if (response.status === 200) {
                const propertyData = response.data;

                // Actualiza los estados con los datos obtenidos
                // Actualiza los valores de los campos de entrada

                if (Array.isArray(propertyData.photos)) {
                    setImageUrls(propertyData.photos.map(photoUrl => ({ uri: photoUrl })));
                } else {
                    // Si no hay fotos o el formato es diferente, establece el estado a un array vacío
                    setImageUrls([]);
                }

                // Manejo de videos
                if (Array.isArray(propertyData.videos)) {
                    setVideoUrls(propertyData.videos.map(videoUrl => ({ uri: videoUrl })));
                } else {
                    setVideoUrls([]);
                }

                // Accede a las coordenadas
                const coordenadas = response.data.coordenadas.coordinates;

                // Longitud y Latitud
                const longitud = coordenadas[1];
                const latitud = coordenadas[0];


                setUbicacionData({
                    ...textInputData,
                    calle: response.data.calle,
                    numero: response.data.numero,
                    piso: response.data.piso,
                    departamento: response.data.departamento,
                    localidad: response.data.localidad,
                    provincia: response.data.provincia,
                    pais: response.data.pais,
                    coordenadas: `${longitud}, ${latitud}`,
                    m2cubiert: response.data.m2cubiert,
                    m2semidescubiert: response.data.m2semidescubiert,
                    m2descubiert: response.data.m2descubiert,
                    cantambient: response.data.cantambient,
                    cantcuartos: response.data.cantcuartos,
                    cantbaños: response.data.cantbaños,
                    antiguedad: response.data.antiguedad.toString(),
                    descripcion: response.data.descripcion,
                    precio: response.data.precio.toString(),
                    expensas: response.data.expensas.toString(),
                });

                // Actualiza los valores de los campos de selección
                setPropertyTypes({
                    ...propertyTypes,
                    house: response.data.house,
                    ph: response.data.ph,
                    apartment: response.data.apartment,
                    local: response.data.local,
                    office: response.data.office,
                    territory: response.data.galpon,
                });

                setCharacteristicsProp({
                    ...characteristicsProp,
                    terraza: response.data.terraza,
                    balcon: response.data.balcon,
                    cochera: response.data.cochera,
                    baulera: response.data.baulera,
                });

                setFrenteTypes({
                    ...frenteTypes,
                    frente: response.data.frente,
                    contrafrente: response.data.contrafrente,
                });

                setOrientTypes({
                    ...orientTypes,
                    orientnorte: response.data.orientnorte,
                    orientsur: response.data.orientsur,
                    orienteste: response.data.orienteste,
                    orientOeste: response.data.orientOeste,
                });

                setAmenities({
                    ...amenities,
                    sum: response.data.sum,
                    pool: response.data.pool,
                    quincho: response.data.quincho,
                    solarium: response.data.solarium,
                    sauna: response.data.sauna,
                    roomgames: response.data.roomgames,
                    calefaccion: response.data.calefaccion,
                    coworking: response.data.coworking,
                    microcine: response.data.microcine,
                });

                setStateTypes({
                    ...stateTypes,
                    alquiler: response.data.alquiler,
                    venta: response.data.venta,
                    reservada: response.data.reservada,
                    alquiladaVendida: response.data.alquiladaVendida,
                });

                // Actualiza el estado del dólar
                setIsDollar(response.data.dolar);


                setIsLoading(false); // Marcamos que la carga ha terminado


            } else {
                console.error('Error al obtener los datos de la propiedad:', response.data.message);
            }
        } catch (error) {
            console.error('Error al obtener los datos de la propiedad:', error);
        }
    };


    useEffect(() => {
        if (isFocused) {
            setIsLoading(true); // Mostramos el indicador de carga al iniciar la carga de datos
            fetchPropertyData();
        }
    }, [isFocused]);



    const navigation = useNavigation();

    // const initialPropertyAll = {};

    // const [propertyData, setPropertyData] = useState(initialPropertyAll);

    const [updateImageModalVisible, setUpdateImageModalVisible] = useState(false);
    const openUpdateImageModal = () => {
        setUpdateImageModalVisible(true);
    };
    const closeUpdateImageModal = () => {
        setUpdateImageModalVisible(false);
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
        localidad: '',
        provincia: '',
        pais: '',
        coordenadas: '',
        m2cubiert: '',
        m2semidescubiert: '',
        m2descubiert: '',
        cantambient: '',
        cantcuartos: '',
        cantbaños: '',
        antiguedad: '',
        descripcion: '',
        precio: '',
        expensas: '',
    });

    const [propertyTypes, setPropertyTypes] = useState(initialPropertyTypes);
    const [characteristicsProp, setCharacteristicsProp] = useState(initialCharacteristics);
    const [frenteTypes, setFrenteTypes] = useState(initialFrenteTypes);
    const [orientTypes, setOrientTypes] = useState(initialOrientTypes);
    const [amenities, setAmenities] = useState(initialAmenities);
    const [stateTypes, setStateTypes] = useState(initialState);
    const [isDollar, setIsDollar] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);



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


    //MANEJO DE BOTONES


    const handleUploadPhoto = () => {
        ImagePicker.openPicker({
            multiple: true,
            // ... otras opciones ...
        }).then(newImages => {
            const newImageInfo = newImages.map(image => ({
                uri: image.path,
                type: image.mime,
                name: image.filename || `image-${Date.now()}`
            }));

            // Concatenar nuevas imágenes con las existentes
            setImageUrls(prevImages => [...prevImages, ...newImageInfo]);
        }).catch(error => {
            console.log('Error al seleccionar imágenes:', error);
        });
    };

    // Función para eliminar una foto específica
    const removeImage = (indexToRemove) => {
        setImageUrls(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const uploadImages = async () => {
        const uploadedUrls = [];

        for (const image of imageUrls) {
            // Verificar si la imagen ya está en Cloudinary
            if (!image.uri.startsWith('https://res.cloudinary.com')) {
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
            } else {
                // Si la imagen ya está en Cloudinary, simplemente añadir su URL
                uploadedUrls.push(image.uri);
            }
        }

        return uploadedUrls;
    };


    const handleUploadVideo = () => {
        ImagePicker.openPicker({
            mediaType: 'video',
            multiple: true,
        }).then(selectedVideos => {
            const newVideoInfo = selectedVideos.map(video => ({
                uri: video.path,
                type: video.mime,
                name: video.filename || `video-${Date.now()}`
            }));
            setVideoUrls(prevVideos => [...prevVideos, ...newVideoInfo]);
        }).catch(error => {
            console.log('Error al seleccionar videos:', error);
        });
    };
    const removeVideo = (indexToRemove) => {
        setVideoUrls(prevVideos => prevVideos.filter((_, index) => index !== indexToRemove));
    };
    const uploadVideos = async () => {
        const uploadedUrls = [];

        for (const video of videoUrls) {
            const formData = new FormData();
            formData.append('file', {
                uri: video.uri,
                type: video.type,
                name: video.name,
            });
            formData.append('upload_preset', 'Videos-properties');

            try {
                const uploadResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                uploadedUrls.push(uploadResponse.data.secure_url);
            } catch (error) {
                console.log('Error al subir el video:', error);
                throw error; // Si un video falla, puedes decidir si continuar o detener todo el proceso
            }
        }

        return uploadedUrls;
    };



    const handleUpdateProperty = async () => {
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

            const apiUrl = `${SERVER_URL}/api/properties/update/${route.params.propertyId}`;

            // Obtiene el token de AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            //obtener coordenadas

            // Uso de la función para obtener coordenadas desde una dirección
            const address = `${textInputData.calle} ${textInputData.numero}, ${textInputData.localidad}, ${textInputData.pais}`;
            const coordinatesdata = await getCoordinatesFromAddress(address);
            const coordinates = `${coordinatesdata.latitude}, ${coordinatesdata.longitude}`;

            let photoUrls = [];
            let videoUrlsUploaded = videoUrls.some(video => video.type) ? await uploadVideos() : videoUrls.map(video => video.uri);

            // Si hay nuevas fotos seleccionadas (asumiendo que las nuevas fotos tienen 'type')
            if (imageUrls.some(image => image.type)) {
                photoUrls = await uploadImages();
            } else {
                // Si no hay fotos nuevas, usa las URLs existentes
                photoUrls = imageUrls.map(image => image.uri);
            }


            // Define los datos actualizados de la propiedad
            const updatedPropertyData = {
                calle: textInputData.calle,
                numero: textInputData.numero,
                piso: textInputData.piso,
                departamento: textInputData.departamento,
                localidad: textInputData.localidad,
                provincia: textInputData.provincia,
                pais: textInputData.pais,
                coordenadas: {
                    type: 'Point',
                    coordinates: [coordinatesdata.latitude, coordinatesdata.longitude] // Longitud, Latitud
                },
                m2cubiert: textInputData.m2cubiert,
                m2semidescubiert: textInputData.m2semidescubiert,
                m2descubiert: textInputData.m2descubiert,
                cantambient: textInputData.cantambient,
                cantcuartos: textInputData.cantcuartos,
                cantbaños: textInputData.cantbaños,
                antiguedad: parseFloat(textInputData.antiguedad.replace(/,/g, '')),
                precio: parseFloat(textInputData.precio.replace(/,/g, '')),
                expensas: parseFloat(textInputData.expensas.replace(/,/g, '')),
                house: propertyTypes.house,
                ph: propertyTypes.ph,
                apartment: propertyTypes.apartment,
                local: propertyTypes.local,
                office: propertyTypes.office,
                territory: propertyTypes.galpon,
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
                photos: photoUrls, // Asegúrate de que esto sea un array de URLs
                videos: videoUrlsUploaded,
                alquiler: stateTypes.alquiler,
                venta: stateTypes.venta,
                reservada: stateTypes.reservada,
                alquiladaVendida: stateTypes.alquiladaVendida,
                dolar: isDollar,
            };

            // Realiza la solicitud PUT al servidor
            const response = await axios.put(apiUrl, updatedPropertyData, {
                headers: {
                    Authorization: token, // Incluye el token en la cabecera de la solicitud
                },
            });

            // Muestra una alerta de actualización exitosa
            alert('Propiedad actualizada exitosamente!');

            // Redirige o realiza otras acciones necesarias después de la actualización
            navigation.goBack(); // Redirige a la pantalla anterior, por ejemplo
        } catch (error) {
            console.error('Error al actualizar la propiedad:', error);
            // Muestra una alerta de error en la actualización
            alert('Error al actualizar la propiedad');
        }
    };

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

    return (
        <View style={styles.container}>
            {isLoading ? ( // Muestra el indicador de carga si isLoading es verdadero
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
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

                    {/* Select Lists  */}

                    <SelectList //Pais
                        boxStyles={styles.listBox}
                        dropdownStyles={styles.dropdown}
                        inputStyles={styles.textDropList}
                        dropdownTextStyles={styles.dropdownTextStyles}
                        setSelected={setPaisSeleccionado}
                        data={pais}
                        defaultOption={textInputData.pais}
                        search={false}
                        maxHeight={100}
                        placeholder={textInputData.pais}
                        //searchPlaceholder={I18n.t('search')}
                        //notFoundText={"No se encontro resultado"}
                        save='value'
                    />

                    <SelectList //Provincia
                        boxStyles={styles.listBox}
                        dropdownStyles={styles.dropdown}
                        inputStyles={styles.textDropList}
                        dropdownTextStyles={styles.dropdownTextStyles}
                        setSelected={onProvinciaChange}
                        data={provincia}
                        defaultOption={textInputData.provincia}
                        search={true}
                        maxHeight={100}
                        placeholder={textInputData.provincia}
                        searchPlaceholder={I18n.t('search')}
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
                        defaultOption={textInputData.localidad}
                        search={true}
                        maxHeight={300}
                        placeholder={textInputData.localidad}
                        searchPlaceholder={I18n.t('search')}
                        notFoundText={"No se encontro resultado"}
                        save='value'
                    />

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
                        defaultOption={textInputData.cantambient}
                        search={false}
                        maxHeight={200}
                        placeholder={textInputData.cantambient}
                        searchPlaceholder={I18n.t('search')}
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
                        defaultOption={textInputData.cantcuartos}
                        search={false}
                        maxHeight={200}
                        placeholder={textInputData.cantcuartos}
                        searchPlaceholder={I18n.t('search')}
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
                        defaultOption={textInputData.cantbaños}
                        search={false}
                        maxHeight={120}
                        placeholder={textInputData.cantbaños}
                        searchPlaceholder={I18n.t('search')}
                        notFoundText={"No se encontro resultado"}
                        save='value'
                    />

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

                    <Divider style={styles.invisibleDivider} />

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

                    <Divider style={styles.invisibleDivider} />

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

                    <CustomTextInput
                        label={I18n.t('description')}
                        value={textInputData.descripcion}
                        onChangeText={(text) => {
                            // Convierte la primera letra en mayúscula y el resto en minúsculas
                            text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                            setUbicacionData({ ...textInputData, descripcion: text });
                        }}
                    />

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
                                        <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeButton}>
                                            <Text style={styles.removeButtonText}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )
                    }

                    < CustomButton title={I18n.t('uploadVideo')} onPress={handleUploadVideo} style={styles.uploadphotoButton} />
                    {
                        videoUrls.length > 0 && (
                            <View style={styles.selectedVideosContainer}>
                                {videoUrls.map((video, index) => (
                                    video.uri ? (
                                        <View key={index} style={styles.videoContainer}>
                                            <Video
                                                source={{ uri: video.uri }}
                                                style={styles.video}
                                            // otras propiedades como repeat, resizeMode, etc.
                                            />
                                            <TouchableOpacity onPress={() => removeVideo(index)} style={styles.removeButton}>
                                                <Text style={styles.removeButtonText}>Eliminar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : null
                                ))}
                            </View>
                        )
                    }

                    <Text></Text>
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

                    <CustomButton title={I18n.t('saveChanges')} onPress={handleUpdateProperty} style={styles.registerButton} />

                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 5,
        textAlign: 'center',
    },
    invisibleDivider: {
        alignSelf: 'center',
        padding: 0.5,
        margin: 5,
        width: '80%'
    },

    // CheckBox
    checkboxRow: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    checkboxText: {
        fontSize: 16,
    },

    // SELECT LIST
    listBox: {
        alignSelf: 'center',
        width: 300,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#E0E4F2',
        borderColor: '#E0E4F2',
    },
    dropdown: {
        alignSelf: 'center',
        width: 300,
        backgroundColor: '#E0E4F2',
        borderColor: '#E0E4F2',
    },
    uploadphotoButton: {
        alignSelf: 'center',
        width: 150,
        height: 40,
        margin: 10,
    },
    textDropList: {
        color: 'black'
    },
    dropdownTextStyles: {
        color: 'black'
    },

    // MANEJO DE IMAGENES Y VIDEO
    uploadphotoButton: {
        alignSelf: 'center',
        width: 150,
        height: 40,
        margin: 10,
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
    selectedImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    selectedVideosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 10,
    },
    removeButtonText: {
        color: 'white',
    },
    titleUpload: {
        fontSize: 10,
        textAlign: 'center',
    },

    // BOTON DE PUBLICAR
    registerButton: {
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 30,
        width: 200,
    },
    videoContainer: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});

export default PropertiesUpdate;
