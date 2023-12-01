import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Paragraph, Title, Text, Avatar } from 'react-native-paper';

const CustomContactsCard = ({ address, username, date, time, coverUrl, message, onPress }) => {
    
    // Número máximo de líneas antes de agregar puntos suspensivos
    const MAX_COMMENT_LINES = 2;

    // Función para truncar el texto del comentario
    const truncateComment = (message) => {
      const lines = message.split('\n');
      if (lines.length > MAX_COMMENT_LINES) {
        const truncatedLines = lines.slice(0, MAX_COMMENT_LINES);
        return `${truncatedLines.join('\n')}...`;
      }
      return message;
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Avatar.Image
                    size={45}
                    source={{ uri: coverUrl }}
                    style={styles.avatar}
                />
                <View style={styles.textContainer}>
                    <Title style={styles.address}>{address}</Title>
                    <Text style={styles.date}>{date + ' - ' + time}</Text>
                    <Text style={styles.username}>{username}</Text>
                    <Paragraph numberOfLines={MAX_COMMENT_LINES} style={styles.message}>{truncateComment(message)}</Paragraph>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: 340,
        height: 140,
        margin: 10,
        borderRadius: 12,
        backgroundColor: '#E0E4F2',
        elevation: 3,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    avatar: {
        marginLeft: 10,
        marginTop: 10,
    },
    address: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: -5,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        fontWeight: 700,
    },
    username: {
        fontSize: 15,
        marginTop: 2,
        marginBottom: 2,
        fontWeight: 500,
    },
    message: {
        textAlign: 'justify',
        marginBottom: -5,
        paddingEnd: 20
    }
});

export default CustomContactsCard;
