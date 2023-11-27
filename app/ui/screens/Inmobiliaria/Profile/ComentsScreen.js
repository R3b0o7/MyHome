import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import CustomCommentsCard from '../../../components/CustomCommentsCard';
import CustomCommentsList from '../../../components/CustomCommentsCard';

const ComentsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Agrega el icono aquí */}
        <Image
          source={require('../../../../assets/images/Icons/message.png')} // Ajusta la ruta de tu icono
          style={styles.icon}
        />
        {/* Título */}
        <Text style={styles.title}>Histórico de comentarios</Text>
      </View>
      {/* Contenido de los comentarios */}
      <CustomCommentsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 15,
  },
  icon: {
    width: 24, // Ajusta el ancho de tu icono según tus necesidades
    height: 24, // Ajusta la altura de tu icono según tus necesidades
    marginRight: 10, // Ajusta el margen derecho según tus necesidades
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ComentsScreen;