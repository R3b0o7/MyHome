import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Paragraph, Modal, Title } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import I18n from '../../../../assets/strings/I18';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';
import CustomShiftsCard from '../../../components/CustomShiftsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ShiftsUserScreen = (route) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [userShifts, setUserShifts] = useState([]); // Estado para almacenar los turnos del usuario

    const [visible, setVisible] = useState(false);
    const [selectedShift, setSelectedShift] = useState({
        calle: '',
        numero: '',
        piso: '',
        departamento: '',
        userName: '',
        message: '',
        photo: null,
        date: '',
        mañana: null,
        tarde: null,
    });

    const showModal = (shift) => {
        const date = new Date(shift.date); // Crear un objeto de fecha
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(); // Formatear la fecha

        setSelectedShift({
            calle: shift.calle || '',
            numero: shift.numero || '',
            piso: shift.piso || '',
            departamento: shift.departamento || '',
            userName: shift.userName || '',
            message: shift.message || '',
            photo: shift.photo || 'https://picsum.photos/701', // Imagen predeterminada si no hay foto
            date: formattedDate || '',
            mañana: shift.mañana || false,
            tarde: shift.tarde || false,
        });
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const fetchUserShifts = async () => {
        // Obtén el token de AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');

        try {
            const response = await axios.get(`${SERVER_URL}/api/contact/getContactsByUser`, {
                headers: {
                    Authorization: authToken,
                }
            });
            if (response.status === 200) {
                setUserShifts(response.data);
            }

            console.log(response.data);
        } catch (error) {
            console.error('Error al obtener los turnos del usuario:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchUserShifts();
        }
    }, [isFocused]);



    return (
        <View style={styles.PrincipalContainer}>
            <ScrollView>
                <View style={styles.TitleConteiner}>
                    <Image style={styles.ImageTitle} source={require('../../../../assets/images/Icons/lightMode/calendar.png')} />
                    <Text style={styles.Title}>{I18n.t('myContacts')}</Text>
                </View>
                {userShifts.length === 0 ? (
                    <Text style={styles.noShiftsCreated}>
                        {I18n.t('noContactsCreated')}
                    </Text>
                ) : (
                    userShifts.map((data, index) => {
                        const date = new Date(data.date); // Crear un objeto de fecha
                        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(); // Formatear la fecha

                        return (
                            <CustomShiftsCard
                                key={index}
                                address={data.calle + ' ' + data.numero + ' ' + data.piso + '° ' + data.departamento}
                                username={data.userName}
                                date={formattedDate} // Usar la fecha formateada
                                time={
                                    data.mañana
                                        ? 'Mañana'
                                        : data.tarde
                                            ? 'Tarde'
                                            : ''
                                }
                                onPress={() => showModal(data)}
                                coverUrl={data.photo}
                                message={data.message}
                            />
                        );
                    })
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
                        {selectedShift.photo && (
                            <Image style={styles.imageStyle} source={{ uri: selectedShift.photo }} />
                        )}
                        <View>
                            <Title style={styles.addressStyle}>{selectedShift.calle + ' ' + selectedShift.numero + ' ' + selectedShift.piso + '° ' + selectedShift.departamento}</Title>
                            <Text style={styles.dateStyle}>
                                {selectedShift.date + ' - ' +
                                    (selectedShift.mañana
                                        ? 'Mañana'
                                        : selectedShift.tarde
                                            ? 'Tarde'
                                            : '')
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.messageDetails}>
                        <View style={styles.userContainer}>
                            <Image style={styles.imageUser} source={require('../../../../assets/images/Icons/lightMode/perfil.png')} />
                            <Text style={styles.usernameStyle}>{selectedShift.userName}</Text>
                        </View>
                        <Paragraph>{selectedShift.message}</Paragraph>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    PrincipalContainer: {
        flex: 1,

        alignItems: 'center',

        justifyContent: 'flex-start',

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
    noShiftsCreated: {
        fontSize: 18,
        textAlign: 'center',
    }
});

export default ShiftsUserScreen;