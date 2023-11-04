    import React, { useState } from 'react';
    import { View, StyleSheet, ScrollView } from 'react-native';
    import CustomButton from '../../../components/CustomButton';
    import CustomTextInput from '../../../components/CustomTextInput';
    import { useNavigation } from '@react-navigation/native';
    import { Title, Text } from 'react-native-paper';
    import I18n from '../../../../assets/strings/I18';
    import CheckBox from '@react-native-community/checkbox';
    import CustomSwitch from '../../../components/CustomSwitch';
    import UpdateImageModal from '../../../components/UpdateImageModal';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { SERVER_URL } from '../../../../config/config';
    import axios from 'axios';

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
            precio: '',
            expensas: '',
        });

        const [propertyTypes, setPropertyTypes] = useState(initialPropertyTypes);
        const [characteristicsProp, setBathroomCount] = useState(initialCharacteristics);
        const [frenteTypes, setFrenteTypes] = useState(initialFrenteTypes);
        const [orientTypes, setOrientTypes] = useState(initialOrientTypes);
        const [amenities, setAmenities] = useState(initialAmenities);
        const [stateTypes, setStateTypes] = useState(initialState);
        const [isDollar, setIsDollar] = useState(false);



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
            setBathroomCount(updatedcharacteristicsProp);
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

        };


        const handleUploadVideo = () => {

        };

        // Función para enviar la solicitud de registro
        const handleRegister = async () => {
            try {
                console.log('dolar', isDollar);
                // Reemplaza esta URL por la URL de tu backend donde se encuentra la ruta de registro de propiedades
                const apiUrl = `${SERVER_URL}/api/properties/register`;

                // Obtiene el token de AsyncStorage
                const token = await AsyncStorage.getItem('authToken');

                // Define los datos a enviar en la solicitud
                const propertyData = {

                    calle: textInputData.calle,
                    numero: textInputData.numero,
                    piso: textInputData.piso,
                    departamento: textInputData.departamento,
                    localidad: textInputData.localidad,
                    pais: textInputData.pais,
                    coordenadas: textInputData.coordenadas,
                    house: propertyTypes.house,
                    ph: propertyTypes.ph,
                    apartment: propertyTypes.apartment,
                    local: propertyTypes.local,
                    office: propertyTypes.office,
                    galpon: propertyTypes.territory,
                    m2cubiert: textInputData.m2cubiert,
                    m2semidescubiert: textInputData.m2semidescubiert,
                    m2descubiert: textInputData.m2descubiert,
                    cantambient: textInputData.cantambient,
                    cantcuartos: textInputData.cantcuartos,
                    cantbaños: textInputData.cantbaños,
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
                    photos: '',
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
                console.error('Error al registrar la propiedad:', error);
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
                        onChangeText={(text) => setUbicacionData({ ...textInputData, calle: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('streetNumber')}
                        value={textInputData.numero}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, numero: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('floor')}
                        value={textInputData.piso}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, piso: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('apartment')}
                        value={textInputData.departamento}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, departamento: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('city')}
                        value={textInputData.localidad}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, localidad: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('state')}
                        value={textInputData.provincia}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, provincia: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('country')}
                        value={textInputData.pais}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, pais: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('latLong')}
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
                            />
                        </View>
                    ))}

                    <Title style={styles.title}>{I18n.t('characteristics')}</Title>

                    <CustomTextInput
                        label={I18n.t('m2cubiert')}
                        value={textInputData.m2cubiert}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, m2cubiert: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('m2semidescubiert')}
                        value={textInputData.m2semidescubiert}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, m2semidescubiert: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('m2descubiert')}
                        value={textInputData.m2descubiert}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, m2descubiert: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('cantambient')}
                        value={textInputData.cantambient}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, cantambient: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('cantcuartos')}
                        value={textInputData.cantcuartos}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, cantcuartos: text })}
                    />
                    <CustomTextInput
                        label={I18n.t('cantbaños')}
                        value={textInputData.cantbaños}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, cantbaños: text })}
                    />

                    <Text />

                    {Object.keys(characteristicsProp).map((characteristics) => (
                        <View style={styles.checkboxRow} key={characteristics}>
                            <Text style={styles.checkboxText}>{I18n.t(characteristics)}</Text>
                            <CheckBox
                                value={characteristicsProp[characteristics]}
                                onValueChange={() => handleCharacteristicsPropChange(characteristics)}
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
                            />
                        </View>
                    ))}

                    <Text />

                    <CustomTextInput
                        label={I18n.t('antiguedad')}
                        value={textInputData.antiguedad}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, antiguedad: text })}
                    />

                    <Title style={styles.title}>{I18n.t('amenities')}</Title>

                    {Object.keys(amenities).map((amenitiesCh) => (
                    <View style={styles.checkboxRow} key={amenitiesCh}>
                        <Text style={styles.checkboxText}>{I18n.t(amenitiesCh)}</Text>
                        <CheckBox
                            value={amenities[amenitiesCh]}
                            onValueChange={() => handleAmenitiesChange(amenitiesCh)}
                        />
                    </View>
                ))}

                    <Title style={styles.title}>{I18n.t('description')}</Title>

                    <CustomButton title={I18n.t('uploadphoto')} onPress={openUpdateImageModal} style={styles.uploadphotoButton} />
                    <UpdateImageModal visible={updateImageModalVisible} onClose={closeUpdateImageModal} />
                    <Title style={styles.titleUpload}>{I18n.t('requeredPhoto')}</Title>

                    <CustomButton title={I18n.t('uploadVideo')} onPress={openUpdateImageModal} style={styles.uploadphotoButton} />
                    <Text />
                    <CustomTextInput
                        label={I18n.t('precioVentaAlqui')}
                        value={textInputData.precio}
                        onChangeText={(text) => setUbicacionData({ ...textInputData, precio: text })}
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
                        onChangeText={(text) => setUbicacionData({ ...textInputData, expensas: text })}
                    />

                    <Title style={styles.title}>{I18n.t('statePropertie')}</Title>

                    {Object.keys(stateTypes).map((type) => (
                        <View style={styles.checkboxRow} key={type}>
                            <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                            <CheckBox
                                value={stateTypes[type]}
                                onValueChange={() => handleStateChange(type)}
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
    });

    export default PropertiesToRegister;
