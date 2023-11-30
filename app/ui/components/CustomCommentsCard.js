import React from 'react';
import { Avatar, Paragraph, Title} from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import RatingStars from './RatingStars';

const CustomCommentsCard  = ({ userName, rating, userPhoto, commentText, onSelectComment }) => {

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

  return (
    <TouchableOpacity onPress={() => onSelectComment({ userName, userPhoto, commentText, rating })}>
      <View style={styles.container}>
          <Avatar.Image
                  size={45}
                  source={{ uri: userPhoto }}
                  style={styles.avatar}
              />
          <View style={styles.textContainer}> 
              <Title style={styles.nombre}>{userName}</Title>
              <Paragraph numberOfLines={MAX_COMMENT_LINES} style={styles.commentText}>{truncateComment(commentText)}</Paragraph>
              <View style={styles.starsContainer}>
                <RatingStars rating={rating} />
              </View>
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
    height: 130,
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#E0E4F2',
    elevation: 3,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  starsContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingEnd: 20,
    marginTop: 5,
  },
  avatar: {
    marginLeft: 10,
    marginTop: 10,
  },
  nombre: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: -7,
    fontWeight: 'bold',
  },
  commentText: {
    textAlign: 'justify',
    marginBottom: -5,
    paddingEnd: 20
  },
});

export default CustomCommentsCard;