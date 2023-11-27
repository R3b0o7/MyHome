import React, { useState } from 'react';
import { Avatar, Card, Paragraph, Modal, Portal } from 'react-native-paper';
import { StyleSheet, ScrollView, View, Text, Image, Dimensions } from 'react-native';

// Número máximo de líneas antes de agregar puntos suspensivos
const MAX_COMMENT_LINES = 3;

// Función para truncar el texto del comentario
const truncateComment = (commentText) => {
  const lines = commentText.split('\n');
  if (lines.length > MAX_COMMENT_LINES) {
    const truncatedLines = lines.slice(0, MAX_COMMENT_LINES);
    return `${truncatedLines.join('\n')}...`;
  }
  return commentText;
};

// Componente de la tarjeta de comentarios personalizada
const CustomCommentsCard = ({ userName, commentText, userPhoto, rating, onPress }) => (
  <Card style={styles.card} onPress={onPress}>
    <Card.Title
      title={<Text style={styles.userNameCards}>{userName}</Text>}
      //subtitle="Comments"
      left={(props) => <Avatar.Image {...props} /*source={userPhoto}*/ style={styles.userImageCards} />}
    />
    <Card.Content>
      <View>
        <Paragraph numberOfLines={MAX_COMMENT_LINES} style={styles.commentText}>{truncateComment(commentText)}</Paragraph>
      </View>
      <View style={styles.ratingContainer}>
        <RatingStars rating={rating} />
      </View>
    </Card.Content>
  </Card>
);

// Componente de estrellas para la calificación
const RatingStars = ({ rating }) => {
  const starIcons = [];
  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <Text key={i} style={i < rating ? styles.starIconFilled : styles.starIcon}>
        ★
      </Text>
    );
  }
  return <View style={styles.ratingContainer}>{starIcons}</View>; // Invierte el orden de las estrellas
};

// Componente principal de la lista de comentarios personalizada
const CustomCommentsList = () => {
  const [visible, setVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState({ userName: '', commentText: '', userPhoto: null, rating: 0 });

  // Función para mostrar el modal con la información del comentario seleccionado
  const showModal = (userName, commentText, userPhoto, rating) => {
    setSelectedComment({ userName, commentText, userPhoto, rating });
    setVisible(true);
  };

  // Función para ocultar el modal
  const hideModal = () => {
    setSelectedComment({ userName: '', commentText: '', userPhoto: null, rating: 0 });
    setVisible(false);
  };

  return (
    <ScrollView>
      {/* Ejemplos de CustomCommentsCard, agrega más según sea necesario */}
      <CustomCommentsCard
        userName="User1"
        userPhoto={require('../../assets/images/misc/logotipo.png')}
        commentText="Este es el primer comentario. Este es el primer comentario. Este es el primer comentario. Este es el primer comentario. Este es el primer comentario. Este es el primer comentario."
        rating={4} // Cambia esto según la calificación
        onPress={() => showModal("User1", "Este es el primer comentario. Este es el primer comentario. Este es el primer comentario. Este es el primer comentario. Este es el primer comentario. Este es el primer comentario.", require('../../assets/images/misc/logotipo.png'), 4)}
      />
      <CustomCommentsCard
        userName="User2"
        userPhoto={require('../../assets/images/misc/logotipo.png')}
        commentText="Este es el segundo comentario. Este es el segundo comentario. Este es el segundo comentario. Este es el segundo comentario. Este es el segundo comentario."
        rating={3} // Cambia esto según la calificación
        onPress={() => showModal("User2", "Este es el segundo comentario. Este es el segundo comentario. Este es el segundo comentario. Este es el segundo comentario. Este es el segundo comentario.", require('../../assets/images/misc/logotipo.png'), 3)}
      />
      <CustomCommentsCard
        userName="User3"
        userPhoto={require('../../assets/images/misc/logotipo.png')}
        commentText="Este es el tercer comentario. Este es el tercer comentario. Este es el tercer comentario. Este es el tercer comentario. Este es el tercer comentario."
        rating={5} // Cambia esto según la calificación
        onPress={() => showModal("User3", "Este es el tercer comentario. Este es el tercer comentario. Este es el tercer comentario. Este es el tercer comentario. Este es el tercer comentario.", require('../../assets/images/misc/logotipo.png'), 5)}
      />
      <CustomCommentsCard
        userName="User4"
        userPhoto={require('../../assets/images/misc/logotipo.png')}
        commentText="Este es el cuarto comentario. Este es el cuarto comentario. Este es el cuarto comentario. Este es el cuarto comentario. Este es el cuarto comentario."
        rating={2} // Cambia esto según la calificación
        onPress={() => showModal("User4", "Este es el cuarto comentario. Este es el cuarto comentario. Este es el cuarto comentario. Este es el cuarto comentario. Este es el cuarto comentario.", require('../../assets/images/misc/logotipo.png'), 2)}
      />
      <CustomCommentsCard
        userName="User5"
        userPhoto={require('../../assets/images/misc/logotipo.png')}
        commentText="Este es el quinto comentario. Este es el quinto comentario. Este es el quinto comentario. Este es el quinto comentario. Este es el quinto comentario."
        rating={1} // Cambia esto según la calificación
        onPress={() => showModal("User5", "Este es el quinto comentario. Este es el quinto comentario. Este es el quinto comentario. Este es el quinto comentario. Este es el quinto comentario.", require('../../assets/images/misc/logotipo.png'), 1)}
      />
      {/* Agrega más CustomCommentsCard según sea necesario */}

      {/* Portal para renderizar el modal fuera de la jerarquía de estilos principal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[styles.modalContainer, styles.modalContent]}
          dismissable={true} // Permite cerrar el modal al tocar fuera de él
        >
          <View>
            {/* Parte superior del modal con la imagen y el nombre de usuario */}
            <View style={styles.topRow}>
              <Image source={selectedComment.userPhoto} style={styles.userImage} />
              <Text style={styles.userName}>{selectedComment.userName}</Text>
            </View>
            {/* Detalles del comentario */}
            <View style={styles.commentDetails}>
              <Paragraph>{selectedComment.commentText}</Paragraph>
              <View style={styles.ratingContainer}>
                <RatingStars rating={selectedComment.rating} />
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

// Dimensiones de la ventana para el diseño responsive
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Estilos
const styles = StyleSheet.create({
  card: {
    flex: 1,
    //borderWidth: 1,
    borderColor: 'black',
    //padding: 0,
    marginHorizontal: 14,
    borderRadius: 15,
    backgroundColor: '#E0E4F2',
    marginBottom: 20,
  },
  commentText: {
    paddingLeft: 55, // Ajusta este valor según sea necesario
    marginTop: -15,
    //marginBottom: -2
  },
  userNameCards: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: -5
  },
  modalContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 15,
  },
  modalContent: {
    flexDirection: 'column',
    //alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    borderRadius: 15,
    backgroundColor: '#E0E4F2',
    //borderWidth: 1,
    //borderColor: 'black',
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImageCards: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  commentDetails: {
    width: '100%',
    paddingHorizontal: 5
    //alignItems: 'center',
    //alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinea las estrellas a la derecha
    marginTop: 5,
  },
  starIcon: {
    color: 'gray',
    fontSize: 20,
    marginLeft: 2, // Ajusta el margen izquierdo para separar las estrellas
  },
  starIconFilled: {
    color: 'gold',
    fontSize: 20,
    marginLeft: 2, // Ajusta el margen izquierdo para separar las estrellas
  },
});

export default CustomCommentsList;