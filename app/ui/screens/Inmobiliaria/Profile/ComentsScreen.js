import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Importa las imágenes locales desde la carpeta assets
const avatar1 = require('../../../../assets/images/Icons/lightMode/mail.png');
const avatar2 = require('../../../../assets/images/Icons/lightMode/mail.png');
const avatar3 = require('../../../../assets/images/Icons/lightMode/mail.png');
const avatar4 = require('../../../../assets/images/Icons/lightMode/mail.png');
const avatar5 = require('../../../../assets/images/Icons/lightMode/mail.png');

const comentarios = [
    {
        id: 1,
        usuario: 'Usuario1',
        comentario: 'Este es un comentario de prueba 1. Este comentario es bastante largo y se recortará con "..." al final si es demasiado largo.',
        avatar: avatar1,
    },
    {
        id: 2,
        usuario: 'Usuario2',
        comentario: 'Este es un comentario de prueba 2. Este es un comentario de prueba 2',
        avatar: avatar2,
    },
    {
        id: 3,
        usuario: 'Usuario3',
        comentario: 'Este es un comentario de prueba 3. Este es un comentario de prueba 3',
        avatar: avatar3,
    },
    // Agrega más comentarios aquí
    {
        id: 4,
        usuario: 'Usuario4',
        comentario: 'Este es un comentario de prueba 4. Este es un comentario de prueba 4',
        avatar: avatar4,
    },
    {
        id: 5,
        usuario: 'Usuario5',
        comentario: 'Este es un comentario de prueba 5. Este es un comentario de prueba 5',
        avatar: avatar5,
    },
    // Agrega más comentarios aquí
];

const ComentarioCard = ({ usuario, comentario, avatar, onCommentPress }) => (
    <TouchableOpacity onPress={onCommentPress}>
        <View style={styles.card}>
            <Image source={avatar} style={styles.avatar} />
            <View style={styles.content}>
                <Text style={styles.usuario}>{usuario}</Text>
                <Text style={styles.comentario} numberOfLines={3}>
                    {comentario}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const ComentariosScreen = () => {
    const [selectedComment, setSelectedComment] = useState(null);

    const handleCommentPress = (comment) => {
        setSelectedComment(comment);
    };

    const closeDetail = () => {
        setSelectedComment(null);
    };

    return (
        <View style={styles.containerPrincipal}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Historico de Comentarios</Text>
                <FlatList
                    data={comentarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ComentarioCard
                            usuario={item.usuario}
                            comentario={item.comentario}
                            avatar={item.avatar}
                            onCommentPress={() => handleCommentPress(item)}
                        />
                    )}
                />
                {selectedComment && (
                    <View style={styles.overlay}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeDetail}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                        <View style={styles.detailCard}>
                            <Text style={styles.detailUsuario}>{selectedComment.usuario}</Text>
                            <Text style={styles.detailComentario}>{selectedComment.comentario}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16
    },
    container: {
        flex: 1,
        padding: 0,
        marginTop: 100,
        alignItems: 'center',
        marginBottom: 16,
        padding: 16,
        marginVertical: 50,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignItems: 'center'
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E0E4F2',
        borderRadius: 15,
        padding: 16,
        margin: 8,
        marginBottom: 10,
        //alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    usuario: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        paddingLeft: 60,
    },
    comentario: {
        fontSize: 15,
        fontFamily: 'Roboto',
        paddingLeft: 60
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        width: '90%',
    },
    detailUsuario: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailComentario: {
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'white',
    },
});

export default ComentariosScreen;