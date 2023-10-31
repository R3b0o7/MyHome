import * as React from 'react';
import { Card } from 'react-native-paper';

const ImagePop = ({ coverUrl }) => (
    <Card style={{ width: 250, alignSelf: 'center' }}>
        <Card.Cover source={{ uri: coverUrl }} />
    </Card>
);

export default ImagePop;
