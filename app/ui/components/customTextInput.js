import * as React from 'react';
import { TextInput} from 'react-native-paper';

const CustomTextInput = (props) => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
        label={props.label} //Le pasa al componente el str del encabezado
        value={text}
        onChangeText={text => setText(text)}
        disabled={props.disabled} //Le pasa al componente boolean activado/desactivado
        right={<TextInput.Icon icon={props.icon} />} //Le pasa al componente la ruta del icono derecho

        // Estilo del componente
        style={{
          fontSize:20, 
          margin:8,
          marginLeft: 48,
          marginRight: 48,
          backgroundColor:'#E0E4F2',
          borderEndColor: '#203562',
          borderBottomColor: '#203562',
        }}
    />
  );
};

export default CustomTextInput;

