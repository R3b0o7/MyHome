import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import CustomButton from './CustomButton';

const CustomCard = ({ address, description, coverUrl, CustomButtonTitle, onCustomButtonPress }) => (
    <Card style={{ width: 250, alignSelf: 'center' }}>
        <Card.Cover source={{ uri: coverUrl }} />
        <Card.Content>
            <Text variant="titleLarge">{address}</Text>
            <Text variant="bodyMedium">{description}</Text>
        </Card.Content>
        <Card.Actions>
            <CustomButton
                title={CustomButtonTitle}
                onPress={onCustomButtonPress} // Llama a la función personalizada al presionar el botón
            />
        </Card.Actions>
    </Card>
);

export default CustomCard;
