import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { Title, Text } from 'react-native-paper';
import I18n from '../../../../assets/strings/I18';
import CheckBox from '@react-native-community/checkbox';

const PropertiesToRegister = () => {
    const navigation = useNavigation();

    const initialPropertyTypes = {
        house: false,
        ph: false,
        apartment: false,
        local: false,
        office: false,
        galpon: false,
        territory: false,
    };

    const initialCharacteristics = {
        terraza: false,
        balcon: false,
        cochera: false,
        baulera: false,
    };

    const initialFrenteTypes = {
        frente: false,
        contrafrente: false,
    };

    const initialOrientTypes = {
        orientnorte: false,
        orientsur: false,
        orienteste: false,
        orientOeste: false,
    };

    const [propertyTypes, setPropertyTypes] = useState(initialPropertyTypes);
    const [characteristicsProp, setBathroomCount] = useState(initialCharacteristics);
    const [frenteTypes, setFrenteTypes] = useState(initialFrenteTypes);
    const [orientTypes, setOrientTypes] = useState(initialOrientTypes);

    //que solo se pueda marcar un tipo de propiedad
    const handlePropertyTypeChange = (propertyType) => {
        const updatedPropertyTypes = { ...initialPropertyTypes };
        updatedPropertyTypes[propertyType] = !propertyTypes[propertyType];
        setPropertyTypes(updatedPropertyTypes);
    };
    //que se puedan marcar varias a la vez
    const handleCharacteristicsPropChange = (count) => {
        const updatedcharacteristicsProp = { ...characteristicsProp };
        updatedcharacteristicsProp[count] = !characteristicsProp[count];
        setBathroomCount(updatedcharacteristicsProp);
    };

    //que solo se pueda marcar frente o contra frente
    const handleFrenteChange = (frenteType) => {
        const updatedFrente = { ...initialFrenteTypes };
        updatedFrente[frenteType] = !frenteTypes[frenteType];
        setFrenteTypes(updatedFrente);
    };
    //que solo se pueda marcar una orientacion
    const handleOrientChange = (orientType) => {
        const updatedOrient = { ...initialOrientTypes };
        updatedOrient[orientType] = !orientTypes[orientType];
        setOrientTypes(updatedOrient);
    };

    // Función vacía para manejar la acción de registro
    const handleRegister = () => {
        alert('Registro exitoso');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Title style={styles.title}>{I18n.t('location')}</Title>
                <CustomTextInput label={I18n.t('address')} />
                <CustomTextInput label={I18n.t('streetNumber')} />
                <CustomTextInput label={I18n.t('floor')} />
                <CustomTextInput label={I18n.t('apartment')} />
                <CustomTextInput label={I18n.t('city')} />
                <CustomTextInput label={I18n.t('state')} />
                <CustomTextInput label={I18n.t('country')} />
                <CustomTextInput label={I18n.t('latLong')} />

                <Title style={styles.title}>{I18n.t('kindOfProperty')}</Title>

                {Object.keys(propertyTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={propertyTypes[type]}
                            onValueChange={() => handlePropertyTypeChange(type)}
                        />
                    </View>
                ))}

                <Title style={styles.title}>{I18n.t('characteristics')}</Title>

                <CustomTextInput label={I18n.t('m2cubiert')} />
                <CustomTextInput label={I18n.t('m2semidescubiert')} />
                <CustomTextInput label={I18n.t('m2descubiert')} />
                <CustomTextInput label={I18n.t('cantambient')} />
                <CustomTextInput label={I18n.t('cantcuartos')} />

                {Object.keys(characteristicsProp).map((count) => (
                    <View style={styles.checkboxRow} key={count}>
                        <Text style={styles.checkboxText}>{I18n.t(count)}</Text>
                        <CheckBox
                            value={characteristicsProp[count]}
                            onValueChange={() => handleCharacteristicsPropChange(count)}
                        />
                    </View>
                ))}

                <Text />

                {Object.keys(frenteTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={frenteTypes[type]}
                            onValueChange={() => handleFrenteChange(type)}
                        />
                    </View>
                ))}

                <Text />

                {Object.keys(orientTypes).map((type) => (
                    <View style={styles.checkboxRow} key={type}>
                        <Text style={styles.checkboxText}>{I18n.t(type)}</Text>
                        <CheckBox
                            value={orientTypes[type]}
                            onValueChange={() => handleOrientChange(type)}
                        />
                    </View>
                ))}
                <Text />


                <CustomTextInput label={I18n.t('antiguedad')} />

                <CustomButton title={I18n.t('toRegister')} onPress={handleRegister} style={styles.registerButton} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {},
    title: {
        fontSize: 20,
        marginVertical: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
    },
    checkboxText: {
        fontSize: 16,
    },
    registerButton: {
        marginTop: 100,
        margin: 70,
        marginLeft: 150,
        marginRight: 150,
    },
    checkboxTitle: {
        fontSize: 18,
        marginVertical: 10,
        marginLeft: 40,
        marginRight: 40,
        fontWeight: 'bold',
    },
});

export default PropertiesToRegister;
