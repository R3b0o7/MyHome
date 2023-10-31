import * as React from 'react';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
const CustomHelperText = (prop) => {
  const [text, setText] = React.useState('');
  const onChangeText = text => setText(text);
  const hasErrors = () => {
    return prop.validate(text);
  };
  return (
    <View>
      <TextInput label={prop.label} value={text} onChangeText={onChangeText}
        style={{
          fontSize: 17,
          margin: 8,
          marginLeft: 40,
          marginRight: 40,
          backgroundColor: '#E0E4F2', // Fondo
          borderBottomColor: '#203562', // Borde inferior
          color: '#1D1B20', // Color del texto del input
          height: 50, // Altura personalizada
          width: '80%', // Ancho personalizado
          margin: 0,
        }}
        theme={{
          colors: {
            primary: '#203562', // Color del label
            placeholder: '#203562', // Color del placeholder
          },
        }}
      />
      <HelperText
        type={prop.type}
        visible={hasErrors()}
        style={{ color: 'red', fontSize: 12, marginLeft: 40, marginRight: 40}}>
        {prop.messageError}
      </HelperText>
    </View>
  );
};
export default CustomHelperText;