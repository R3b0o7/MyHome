import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InteractiveRatingStars = ({ onChange, starIcon, starIconFilled}) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarPress = (rating) => {
    // Si el usuario presiona la estrella seleccionada, establece la calificación a 0
    const newRating = rating === selectedRating ? 1 : rating;
    setSelectedRating(newRating);
    // Llama a la función onChange con la nueva calificación
    onChange(newRating);
  };

  const starIcons = [];
  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <TouchableOpacity key={i} onPress={() => handleStarPress(i + 1)}>
        <Text style={i < selectedRating ? [styles.starIconFilled, starIconFilled] : [styles.starIcon, starIcon]}>★</Text>
      </TouchableOpacity>
    );
  }

  return <View style={styles.ratingContainer}>{starIcons}</View>;
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    color: 'gray',
    fontSize: 20,
    marginLeft: 2,
  },
  starIconFilled: {
    color: 'gold',
    fontSize: 20,
    marginLeft: 2,
  },
});

export default InteractiveRatingStars;