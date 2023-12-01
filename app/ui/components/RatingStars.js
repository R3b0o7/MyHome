import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const RatingStars = ({ rating, starIcon, starIconFilled }) => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      starIcons.push(
        <Text key={i} style={i < rating ? [styles.starIconFilled, starIconFilled] : [styles.starIcon, starIcon]}>
          ★
        </Text>
      );
    }
    return <View style={styles.ratingContainer}>{starIcons}</View>; // Invierte el orden de las estrellas
  };

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        //justifyContent: 'flex-end', // Alinea las estrellas a la derecha
        //marginTop: 5,
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

export default RatingStars;