import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, Text, Avatar } from 'react-native-paper';

const CustomShiftsCard = ({ address, username, date, time, coverUrl, onPress }) => {
    
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
                    <View style={styles.userContainer}>
                        <Image style={styles.imageUser} source={require('../../assets/images/Icons/lightMode/perfil.png')} />
                        <Text style={styles.username}>{username}</Text>
                    </View>
                    <Text style={styles.expand}>{'Ver Mensaje...'}</Text>
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
        height: 115,
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
        fontWeight: 700,
    },
    username: {
        fontSize: 15,
        marginLeft: 7,
        fontWeight: 500,
    },
    imageUser: {
        width: 20,
        height: 20,
    },
    userContainer: {
        flexDirection: 'row',
        marginTop: 8
    },
    expand: {
        alignSelf: 'flex-end',
        marginRight: 10,
        color: '#797c80',
    },
});

export default CustomShiftsCard;
