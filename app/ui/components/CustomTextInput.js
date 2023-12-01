import * as React from 'react';
import { TextInput } from 'react-native-paper';

const CustomTextInput = (props) => {
  return (
    <TextInput
      label={props.label}
      value={props.value} // Utiliza la prop value directamente
      onChangeText={props.onChangeText}
      disabled={props.disabled}
      right={<TextInput.Icon icon={props.icon} />}
      secureTextEntry={props.secureTextEntry}
      style={{
        alignSelf: 'center',
        fontSize: 17,
        margin: 8,
        // marginLeft: 40,
        // marginRight: 40,
        backgroundColor: '#E0E4F2',
        borderBottomColor: '#203562',
        color: '#1D1B20',
        height: 50,
        width: '80%',
      }}
      theme={{
        colors: {
          primary: '#203562',
          placeholder: '#203562',
        },
      }}
    />
  );
};

export default CustomTextInput;
