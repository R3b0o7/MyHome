import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Paragraph, Modal, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomContactsCard from '../../../components/CustomContactsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ContactScreen = () => {

    const navigation = useNavigation();

    const [userContacts, setUserContacts] = useState([
        {message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ...',
        mañana: false,
        tarde: true,
        date: '12/12/2023',
        address: 'Callao 2000 2do Piso',
        user:'Matias Gomila',
        photo: 'https://picsum.photos/701',},
        {message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ...',
        mañana: true,
        tarde: false,
        date: '1/1/2024',
        address: 'Cordoba 1290 1er Piso',
        user:'John Doe',
        photo: 'https://picsum.photos/702',}
    ]); // Estado para almacenar los turnos del usuario

    const [visible, setVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState({
        address: '',
        user: '',
        message: '',
        photo: null,
        date: '',
        mañana: null,
        tarde: null,
    });

    const showModal = (contact) => {
        setSelectedContact(contact);
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

      /*
    const fetchUserContacts = async () => {
        // Obtén el token de AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');

        // Realiza una solicitud GET para obtener las propiedades del usuario
        try {
            const response = await axios.get(`${SERVER_URL}/api/contact/getContactsByInmobiliaria`, {
                headers: {
                    Authorization: authToken,
                }
            });
            if (response.status === 200) {
                setUserContacts(response.data);
            }
        } catch (error) {
            console.error('Error al obtener los turnos del usuario:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Este código se ejecutará cada vez que la pantalla esté en primer plano
            fetchUserContacts();
        });

        return unsubscribe;
    }, [navigation]); */

    //Crear noContactsCreated style


    return (
        <View style={styles.PrincipalContainer}>
            <ScrollView>
                <View style={styles.TitleConteiner}>
                    <Image style={styles.ImageTitle} source={require('../../../../assets/images/Icons/lightMode/calendar.png')} />
                    <Text style={styles.Title}>{I18n.t('myContacts')}</Text>
                </View>
                {userContacts.length === 0 ? (
                    <Text style={styles.noContactsCreated}>
                        {I18n.t('noContactsCreated')}
                    </Text>
                ) : (
                    userContacts.map((data, index) => ( //Buscar como tomar los datos de la property
                        <CustomContactsCard
                            key={index}
                            address={data.address}
                            username={data.user} //Tomar nombre del usuario en una constante arriba
                            date={data.date}
                            time={
                                data.mañana
                                    ? 'Mañana'
                                    : data.tarde
                                    ? 'Tarde'
                                    : '' // Añade una operación predeterminada si ninguna está en true
                            }
                            onPress={() => showModal(data)}
                            coverUrl={data.photo} //poner url de verdad
                            message={data.message}
                        />
                    ))
                )}
            </ScrollView>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={[styles.modalContainer, styles.modalContent]}
                dismissable={true}
            >
                <View>
                    <View style={styles.topRow}>
                        {selectedContact.photo !== null ? (
                            <Image style={styles.imageStyle} source={{ uri: selectedContact.photo }} />
                        ) : null}
                        <View>
                            <Title style={styles.addressStyle}>{selectedContact.address}</Title>
                            <Text style={styles.dateStyle}>
                            {selectedContact.date + ' - ' +
                                (selectedContact.mañana
                                    ? 'Mañana'
                                    : selectedContact.tarde
                                    ? 'Tarde'
                                    : '') // Parentheses to group the ternary operation
                            }
                        </Text>
                        </View>
                    </View>
                    <View style={styles.messageDetails}>
                        <View style={styles.userContainer}>
                            <Image style={styles.imageUser} source={require('../../../../assets/images/Icons/lightMode/perfil.png')} />
                            <Text style={styles.usernameStyle}>{selectedContact.user}</Text>
                        </View>
                        <Paragraph>{selectedContact.message}</Paragraph>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    PrincipalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    TitleConteiner: {
        flexDirection: 'row',
        marginTop: 10,
        padding: 10
    },
    ImageTitle: {
        width: 35,
        height: 35,
        marginRight: 15,
    },
    Title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    modalContainer: {
        backgroundColor: '#E0E4F2',
        padding: 20,
        margin: 50,
        borderRadius: 10,
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    addressStyle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: -4,
    },
    usernameStyle: {
        fontSize: 15,
        marginLeft: 7,
    },
    messageDetails: {
        marginTop: 15,
        textAlign: 'justify',
    },
    userContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    imageUser: {
        width: 20,
        height: 20,
    },
});

export default ContactScreen;