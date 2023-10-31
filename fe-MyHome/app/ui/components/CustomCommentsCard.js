import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import Stars from './Stars';

const CustomCommentsCard = () => (
  <Card.Title
    title="User"
    subtitle="Comments"
    subtitleNumberOfLines={3}
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    style={styles.card}
  //right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
);

export default CustomCommentsCard;

const styles = StyleSheet.create({
  card: {
    // Estilos de las tarjetas
    borderWidth: 1, // Borde para las tarjetas
    borderColor: 'black', // Color del borde
    padding: 20, // Espacio interno de las tarjetas
    marginVertical: 10, // Espacio vertical entre las tarjetas
    borderRadius: 15,
    backgroundColor: '#E0E4F2'
  },
  starsContainer: {
    position: 'absolute',
    bottom: 10, // Ajusta según tu preferencia
    right: 10, // Ajusta según tu preferencia
  },
});