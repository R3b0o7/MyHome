import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Avatar } from 'react-native-paper';
import RatingStars from './RatingStars';

const InmobiliariaCard = ({ nombre, rating, coverUrl, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Avatar.Image
                        size={65}
                        source={{ uri: coverUrl }}
                        style={styles.avatar}
                    />
                <View style={styles.textContainer}> 
                    <Title style={styles.nombre}>{nombre}</Title>
                    <RatingStars rating={rating} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 80,
        margin: 10,
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#E0E4F2',
        elevation: 3,
      },
    textContainer: {
        marginLeft: 10,
    },
    avatar: {
        marginRight: 10,
    },
      nombre: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold'
    },
});

export default InmobiliariaCard;