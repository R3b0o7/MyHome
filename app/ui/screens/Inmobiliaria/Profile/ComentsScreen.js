import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Paragraph, Modal } from 'react-native-paper';
import I18n from '../../../../assets/strings/I18';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import RatingStars from '../../../components/RatingStars';
import CustomCommentsCard from '../../../components/CustomCommentsCard';
import { SERVER_URL } from '../../../../config/config';

const ComentsScreen = ({ route }) => {
    const loremImpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ..."; // Texto largo de ejemplo
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const isFocused = useIsFocused();
    const [selectedComment, setSelectedComment] = useState({
        userName: '',
        commentText: '',
        userPhoto: null,
        rating: 0,
    });

    useEffect(() => {
        if (isFocused) {
            fetchComments();
        }
    }, [isFocused]);

    const fetchComments = async () => {
        try {
            const propertyId = route.params.inmobiliariaId
            
            const response = await axios.get(`${SERVER_URL}/api/usersComun/comments/${propertyId}`);

            if (response.status === 200) {
                setComments(response.data);
            }
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
            // Manejar el error adecuadamente
        }
    };

    // Comentarios de ejemplo (podrían venir de una API)
    const [comments, setComments] = useState([]);

    const showModal = (comment) => {
        setSelectedComment(comment);
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return (
        <View style={styles.PrincipalContainer}>
            <ScrollView>
                <View style={styles.TitleConteiner}>
                    <Image style={styles.ImageTitle} source={require('../../../../assets/images/Icons/lightMode/message.png')} />
                    <Text style={styles.Title}>Comentarios</Text>
                </View>
                {comments.map((comment, index) => (
                    <CustomCommentsCard
                        key={index}
                        userName={comment.userName}
                        userPhoto={comment.userPhoto}
                        commentText={comment.comment}
                        rating={comment.calificacion}
                        onSelectComment={() => showModal(comment)}
                    />
                ))}
            </ScrollView>

            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={[styles.modalContainer, styles.modalContent]}
                dismissable={true}
            >
                <View>
                    <View style={styles.topRow}>
                        {selectedComment.userPhoto !== null ? (
                            <Image style={styles.userImageStyle} source={{ uri: selectedComment.userPhoto }} />
                        ) : null}
                        <Text style={styles.userNameStyle}>{selectedComment.userName}</Text>
                    </View>
                    <View style={styles.commentDetails}>
                        <Paragraph>{selectedComment.comment}</Paragraph>
                    </View>
                    <View style={styles.starsContainer}>
                        <RatingStars rating={selectedComment.calificacion} />
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

export default ComentsScreen;
