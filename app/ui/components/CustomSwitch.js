import * as React from 'react';
import { Switch } from 'react-native-paper';

const CustomSwitch = ({ value, onValueChange }) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      color="#4363AC"
      ios_backgroundColor="#4363AC"
      trackColor={{
        true: '#4363AC',  // Reemplaza 'colorActivado' por el color del estado activado
        false: '#4363AC',  // Reemplaza 'colorDesactivado' por el color del estado desactivado
      }}
    />
  );
};

export default CustomSwitch;
