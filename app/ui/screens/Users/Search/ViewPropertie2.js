import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Chip, Divider, Text, Card } from 'react-native-paper';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import ImagePop from '../../../components/ImagePop';
import Carousel from 'react-native-snap-carousel';
import I18n from '../../../../assets/strings/I18';
import { SERVER_URL } from '../../../../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import ImageCustomButton from '../../../components/ImageCustomButton';
import InmobiliariaCard from '../../../components/InmobiliariaCard';


const ViewPropertie2 = ({ route }) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    const openVideoModal = (url) => {
        setSelectedVideoUrl(url);
        setIsModalVisible(true);
    };

    const initialCharacteristics = {};
    const [propertyData, setPropertyData] = useState(initialCharacteristics);
    const [inmobiliariaData, setInmobiliariaData] = useState({ nombre: '', coverUrl: 'https://picsum.photos/701', id: '', calificacion: 0 });


    const fetchInmobiliariaData = async (inmobiliariaId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/users/inmobiliaria/${inmobiliariaId}`);
            if (response.status === 200) {


                // Suponiendo que el modelo de datos de la inmobiliaria tiene campos 'userName' y 'photo'
                setInmobiliariaData({
                    nombre: response.data.userName,
                    coverUrl: response.data.photo || 'https://picsum.photos/701',
                    id: inmobiliariaId,
                    calificacion: response.data.calification,
                });
            } else {
                console.error('Error al obtener datos de la inmobiliaria:', response.data.message);
                setInmobiliariaData({

                    coverUrl: 'https://picsum.photos/701'
                });
            }
        } catch (error) {
            console.error('Error al obtener datos de la inmobiliaria:', error);
            setInmobiliariaData({
                nombre: 'Nombre no disponible',
                coverUrl: 'https://ruta-a-tu-imagen-por-defecto.com/default-image.png'
            });
        }
    };
    const [carouselItems, setCarouselItems] = useState([]);


    const fetchPropertyData = async () => {
        try {
            const propertyId = route.params.propertyId;

            const response = await axios.get(`${SERVER_URL}/api/properties/${propertyId}`);

            if (response.status === 200) {
                setPropertyData(response.data);
                // Combinar fotos y videos en carouselItems
                const photos = response.data.photos.map(url => ({ type: 'photo', url }));
                const videos = response.data.videos.map(url => ({ type: 'video', url }));
                setCarouselItems([...photos, ...videos]);
                fetchInmobiliariaData(response.data.owner);
            } else {
                console.error('Error al obtener los datos de la propiedad:', response.data.message);
            }
        } catch (error) {
            console.error('Error al obtener los datos de la propiedad:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchPropertyData();
        }
    }, [isFocused]);


    const handleReserv = () => {
        navigation.push(NavigatorConstant.HOME_USER_STACK.RESERVE, {
            propertyId: route.params.propertyId
        });
    };

    const handleComents = () => {
        const propertyId = inmobiliariaData.id;
        navigation.push(NavigatorConstant.HOME_USER_STACK.COMENTS_PROPERTIES, {
            idInmobiliaria: propertyId,
        });
    };

    const pressHandlerFavorite = async () => {
        try {

            // Obtener el token del usuario desde AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            // Configuración para la solicitud axios (headers con token)
            const config = {
                headers: { Authorization: token }
            };

            // Enviar solicitud para agregar/eliminar de favoritos
            const response = await axios.put(`${SERVER_URL}/api/usersComun/toggleFavorite`, {
                propertyId: route.params.propertyId
            }, config);

            // Mostrar alerta con la respuesta del servidor
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error al modificar favoritos:', error);
            Alert.alert('Error', 'No se pudo modificar la lista de favoritos');
        }
    };

    const handleContact = () => {
        navigation.push(NavigatorConstant.SEARCH_.CONTACT_PROPERTIES, {
            propertyId: route.params.propertyId
        });
    };

    /*const carouselItems = propertyData.photos
        ? propertyData.photos.map((photoUrl, index) => ({
            id: index,
            coverUrl: photoUrl,
        }))
        : [];*/

    const chipsData = [
        { icon: require('../../../../assets/images/Icons/black/m2.png'), label: `${propertyData.m2cubiert}m2` },
        { icon: require('../../../../assets/images/Icons/black/ambientes.png'), label: `${propertyData.cantambient} amb.` },
        { icon: require('../../../../assets/images/Icons/black/bed.png'), label: `${propertyData.cantcuartos} dorm.` },
        { icon: require('../../../../assets/images/Icons/black/bano.png'), label: `${propertyData.cantbaños} baño` },
        { icon: require('../../../../assets/images/Icons/black/calendar.png'), label: `${propertyData.antiguedad} años` },
        { icon: require('../../../../assets/images/Icons/black/car.png'), label: `cochera: ${propertyData.cochera ? 'SI' : 'NO'}` },
    ];

    const amenidades = {
        Sum: propertyData.sum,
        Pool: propertyData.pool,
        Quincho: propertyData.quincho,
        Solarium: propertyData.solarium,
        Sauna: propertyData.sauna,
        Roomgames: propertyData.roomgames,
        Calefaccion: propertyData.calefaccion,
        Coworking: propertyData.coworking,
        Microcine: propertyData.microcine,
        // Agregar otras amenidades aquí
    };

    const amenidadesFiltradas = Object.entries(amenidades)
        .filter(([amenidad, valor]) => valor)
        .map(([amenidad, valor]) => ({ label: amenidad }));

    const otrasCaract = {
        Balcon: propertyData.balcon,
        Terraza: propertyData.terraza,
        Baulera: propertyData.baulera,
        Frente: propertyData.frente,
        ContraFrente: propertyData.contrafrente,
    }
    const otrasCaractFiltradas = Object.entries(otrasCaract)
        .filter(([caract, valor]) => valor)
        .map(([caract, valor]) => ({ label: caract }));

    const renderItem = ({ item }) => {
        if (item.type === 'photo') {
            return (
                <View style={styles.slide}>
                    <ImagePop coverUrl={item.url} />
                </View>
            );
        } else if (item.type === 'video' && item.url) {
            return (
                <TouchableOpacity onPress={() => openVideoModal(item.url)}>
                    <View style={styles.slide}>
                        <Video
                            source={{ uri: item.url }}
                            style={styles.video}
                        // Otras propiedades del video
                        />
                    </View>
                </TouchableOpacity>
            );
        }
        return null; // En caso de que no haya una URL válida
    };

    const renderVideoModal = () => (
        <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
            <View style={styles.modalContent}>
                <Video
                    source={{ uri: selectedVideoUrl }}
                    style={styles.fullScreenVideo}
                    resizeMode="contain" // Asegúrate de que el video se ajuste correctamente
                    controls // Agrega controles al video
                // Otras propiedades del video que puedas necesitar
                />
            </View>
        </Modal>
    );


    return (

        <View style={styles.container}>
            {renderVideoModal()}
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.carouselContainer}>
                    <Carousel
                        data={carouselItems}
                        renderItem={renderItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={250} // Ancho de cada tarjeta en el carrusel
                    />
                </View>

                <Text variant="headlineMedium" style={styles.title}>
                    {propertyData.calle + ' ' + propertyData.numero + ' ' +
                        propertyData.piso + '° ' + propertyData.departamento
                    }
                </Text>

                <Divider style={styles.divider} />

                <View style={styles.currencyContainer}>
                    <Text style={styles.currency}>
                        {propertyData.dolar ? 'U$S' : 'AR$'}
                    </Text>
                    <Text style={styles.price}>
                        {/* el 'en-US' deberia mostrar el separador de miles como . y no como , pero no funciona */}
                        {Number(propertyData.precio).toLocaleString('en-US')}
                    </Text>
                </View>
                <Text style={{ fontSize: 15, alignSelf: 'center' }}>
                    $ {propertyData.expensas} pesos/mes
                </Text>

                <Divider style={styles.divider} />

                <Text variant="headlineSmall" style={styles.subtitle}>
                    Caracteristicas

                </Text>

                <ScrollView horizontal style={{ alignSelf: 'center' }}>
                    <FlatList
                        data={chipsData}
                        renderItem={({ item }) => (
                            <Chip style={styles.chipStyle} icon={item.icon}>
                                {item.label}
                            </Chip>
                        )}
                        numColumns={2} // Establece el número de columnas en 2
                    />
                </ScrollView>

                <Text variant="headlineSmall" style={styles.subtitle}>
                    Amenities
                </Text>

                <ScrollView horizontal style={{ alignSelf: 'center' }}>
                    <FlatList
                        data={amenidadesFiltradas}
                        renderItem={({ item }) => (
                            <Chip style={styles.chipStyle}>
                                {item.label}
                            </Chip>
                        )}
                        numColumns={2} // Establece el número de columnas en 2
                    />
                </ScrollView>

                <Text variant="headlineSmall" style={styles.subtitle}>
                    Otras Caracteristicas
                </Text>

                <ScrollView horizontal style={{ alignSelf: 'center' }}>
                    <FlatList
                        data={otrasCaractFiltradas}
                        renderItem={({ item }) => (
                            <Chip style={styles.chipStyle}>
                                {item.label}
                            </Chip>
                        )}
                        numColumns={2} // Establece el número de columnas en 2
                    />
                </ScrollView>

                <Text variant="headlineSmall" style={styles.subtitle}>
                    Descripción
                </Text>

                <Text style={styles.description}>
                    {propertyData.descripcion}
                </Text>

                <Divider style={styles.divider} />

                <View style={{ alignSelf: 'center' }}>
                    <InmobiliariaCard
                        nombre={inmobiliariaData.nombre}
                        rating={inmobiliariaData.calificacion} // Aquí puedes poner la calificación de la inmobiliaria si la tienes
                        coverUrl={inmobiliariaData.coverUrl}
                        onPress={handleComents}
                    />
                </View>

            </ScrollView>

            <Divider style={{ marginTop: 5, marginBottom: 0 }} />

            <View style={styles.lowerContainer}>
                {/* Contenedor inferior (1/4 de la pantalla) */}

                {/* Condición para renderizar el botón de reserva solo si 'venta' es falso */}
                {!propertyData.venta && !propertyData.reservada && (
                    <ImageCustomButton
                        title={I18n.t('reserv')}
                        imageSource={require('../../../../assets/images/Icons/lightMode/default.png')}
                        onPress={handleReserv}
                        style={styles.boton}
                        imageStyle={styles.BotonImageStyle}
                        textStyle={styles.ButonTextStyle}
                    />
                )}
                <ImageCustomButton
                    style={styles.ImageBoton}
                    imageStyle={styles.ImageStyle}
                    imageSource={require('../../../../assets/images/Stars/starFull.png')}
                    // title={I18n.t('favorite')}
                    onPress={pressHandlerFavorite}
                />
                {!propertyData.reservada && (
                    <ImageCustomButton
                        title={I18n.t('contact')}
                        imageSource={require('../../../../assets/images/Icons/lightMode/mail.png')}
                        onPress={handleContact}
                        style={styles.boton}
                        imageStyle={{ width: 23, height: 18, marginRight: 5 }}
                        textStyle={styles.ButonTextStyle}
                    />
                )}

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    chipStyle: {
        backgroundColor: '#E0E4F2',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 20,
        width: 120
    },
    carouselContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 40
    },
    subtitle: {
        marginTop: 20,
        marginLeft: 40
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        alignSelf: 'center',
        textAlign: 'justify',
        width: '80%',
    },
    divider: {
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        height: 2
    },
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    lowerContainer: {
        bottom: 0,
        padding: 10,
        //backgroundColor: '#e3e3e3',
        //flex: 0.5, // Este contenedor ocupará 1/4 de la pantalla
        //width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //BOTONES INFERIORES
    boton: {
        width: 135,
        height: 38,
        marginRight: 10,
        marginLeft: 10
    },
    BotonImageStyle: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    ButonTextStyle: {
        fontSize: 18
    },
    ImageBoton: {
        width: 40,
        height: 38,
        marginRight: 10,
        marginLeft: 10
    },
    ImageStyle: {
        marginLeft: -1,
        height: 22,
        width: 22,
    },
    //VISTA DE PRECIO Y MONEDA
    currencyContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    currency: {
        zIndex: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 12,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E0E4F2',
        backgroundColor: '#707787',
        position: 'relative',
        marginRight: 140,
        width: 60,
        height: 35
    },
    price: {
        zIndex: 1,
        textAlign: 'center',
        paddingLeft: 50,
        textAlignVertical: 'center',
        borderRadius: 12,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#ACB4CB',
        position: 'absolute',
        width: 200,
        height: 35
    },
    video: {
        width: '100%', // Ajusta las dimensiones según tus necesidades
        height: 200,   // Ajusta las dimensiones según tus necesidades
        // Otros estilos necesarios para el video
    },
    modalContent: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenVideo: {
        width: '100%',
        height: 300, // Ajusta la altura según tus necesidades
    },
});

export default ViewPropertie2;