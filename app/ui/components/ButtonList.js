import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  Popover,
  FlatList,
} from 'react-native';

const ButtonList = ({
  title,
  onPress,
  style,
  items,
}) => {
    
  const [popoverVisible, setPopoverVisible] = useState(false);

  const buttonRef = useRef(null);

  const handlePress = () => {
    setPopoverVisible(true);
  };

  const handleOptionPress = (option) => {
    setPopoverVisible(false);
    onPress(option);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={handlePress}
        ref={buttonRef}
      >
        <View style={styles.buttonContent}>
          <Image style={styles.imageStyle} source={require('../../assets/images/Icons/lightMode/menu.png')} />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>

      <Popover
        visible={popoverVisible}
        onRequestClose={() => setPopoverVisible(false)}
        anchor={buttonRef}
        direction="down"
      >
        <View style={styles.popoverContainer}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionPress(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </Popover>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    position: 'relative',
    backgroundColor: '#E0E4F2',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Roboto',
    fontWeight: '500',
    color: '#4363AC',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  imageStyle: {
    height: 20,
    width: 30,
    marginLeft: 10,
    marginRight: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionButton: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default ButtonList;