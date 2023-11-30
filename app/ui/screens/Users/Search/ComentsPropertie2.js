import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import {  Paragraph, Modal } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/config';

import I18n from '../../../../assets/strings/I18';
import RatingStars from '../../../components/RatingStars';
import CustomCommentsCard from '../../../components/CustomCommentsCard';


const ComentsPropertie2 = () => {
    
    // El lorem impsum NO VA, es para pasarle un texto largo al componente de prueba
    const loremImpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id semper risus in hendrerit gravida. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Ac tortor vitae purus faucibus ornare. Morbi leo urna molestie at elementum eu facilisis sed. Sem nulla pharetra diam sit amet nisl suscipit. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Vel turpis nunc eget lorem dolor. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Amet aliquam id diam maecenas ultricies mi eget. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Eget magna fermentum iaculis eu. Neque convallis a cras semper."

    const navigation = useNavigation();

    // MODAL
    const [visible, setVisible] = useState(false);

    // Definir las propiedades por defecto para pasarle despues al modal las seleccionadas
    const [selectedComment, setSelectedComment] = useState({
        userName: '',
        commentText: '',
        userPhoto: null,
        rating: 0,
    });

    // Función para mostrar el modal con la información del comentario seleccionado pasados por parametro
    const showModal = (comment) => {
        setSelectedComment(comment);
        setVisible(true);
      };

    // Función para ocultar el modal, vuelve a estableser el estado de las propiedades vacias
    const hideModal = () => {
        setSelectedComment({ userName: '', commentText: '', userPhoto: null, rating: 0 });
        setVisible(false);
      };

    return (
        <View  style={styles.PrincipalContainer}>
            <ScrollView>
                <View style={styles.TitleConteiner}>
                    <Image style={styles.ImageTitle} source={require('../../../../assets/images/Icons/lightMode/message.png')}/>
                    <Text style={styles.Title}>Comentarios</Text>
                </View>
                <CustomCommentsCard
                    userName="Jhone Doe"
                    userPhoto= 'https://picsum.photos/701'
                    commentText= {loremImpsum}
                    rating={4}
                    onSelectComment={showModal}
                />
            </ScrollView>

            <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={[styles.modalContainer, styles.modalContent]}
            dismissable={true} // Permite cerrar el modal al tocar fuera de él
            >
                <View>
                    <View style={styles.topRow}>
                        {selectedComment.userPhoto !== null ? (
                        <Image style={styles.userImageStyle} source={{ uri: selectedComment.userPhoto }}/>
                        ) : null}
                        <Text style={styles.userNameStyle}>{selectedComment.userName}</Text>
                    </View>
                    <View style={styles.commentDetails}>
                        <Paragraph>{selectedComment.commentText}</Paragraph>
                    </View>
                    <View style={styles.starsContainer}>
                        <RatingStars rating={selectedComment.rating} />
                    </View>
                </View>
            </Modal>

        </View>
        
    );
};

const styles = StyleSheet.create({
    // CONTENEDORES
    PrincipalContainer:{
        flex: 1,
        alignItems: 'center'
    },
    TitleConteiner: {
        flexDirection: 'row',
        marginTop: 10,
        padding: 10
    },
    // ENCABEZADO
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
    // MODAL
    modalContainer: {
        backgroundColor: 'white',
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
    userImageStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userNameStyle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    commentDetails: {
        marginTop: 10,
        textAlign: 'justify',
    },
    starsContainer: {
        alignItems: 'flex-end',
        marginTop: 5,
      },
});

export default ComentsPropertie2;