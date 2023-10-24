import * as React from 'react';
import { TextInput } from 'react-native-paper';

const CustomTextInput = (props) => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label={props.label} // Le pasa al componente el texto del encabezado
      value={text}
      onChangeText={(text) => setText(text)}
      disabled={props.disabled} // Le pasa al componente un valor booleano para habilitar o deshabilitar
      right={<TextInput.Icon icon={props.icon} />} // Le pasa al componente la ruta del icono derecho

      // Estilo del componente
      style={{
        fontSize: 20,
        margin: 8,
        marginLeft: 48,
        marginRight: 48,
        backgroundColor: '#E0E4F2', // Fondo
        borderBottomColor: '#203562', // Borde inferior
        color: '#1D1B20', // Color del texto del input
        height: 55, // Altura personalizada
        width: '80%', // Ancho personalizado
      }}
      theme={{
        colors: {
          primary: '#203562', // Color del label
          placeholder: '#203562', // Color del placeholder
        },
      }}
    />
  );
};

export default CustomTextInput;
