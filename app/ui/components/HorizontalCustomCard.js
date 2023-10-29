import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Text, Avatar } from 'react-native-paper';

const HorizontalCustomCard = ({ address, operation, coverUrl, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.textContainer}>
                        <Title style={styles.address}>{address}</Title>
                        <Text style={styles.operation}>{operation}</Text>
                    </View>
                    <Avatar.Image
                        size={65}
                        source={{ uri: coverUrl }}
                        style={styles.avatar}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 80,
        margin: 10,
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#E0E4F2',
        elevation: 3,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    address: {
        fontSize: 18,
        marginBottom: 5,
    },
    operation: {
        fontSize: 16,
    },
    avatar: {
        alignSelf: 'flex-end',
    },
});

export default HorizontalCustomCard;
