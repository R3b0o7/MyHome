import react from "react";
import { View, StyleSheet, FlatList, Dimensions} from "react-native";
import { Chip } from 'react-native-paper';
import ImagePop from "../../../components/ImagePop";
import CustomCard from '../../../components/CustomCard';
import Carousel from 'react-native-snap-carousel';
import I18n from '../../../../assets/strings/I18';

const IndividualPropertieScreen = () => {

    const handleCardPress = () => {
        // Define aquí la lógica de navegación

        //navigation.push(NavigatorConstant.LOGIN_STACK.REGISTER); // Navega a la pantalla 'Detalle'

    };

    const carouselItems = [
        {
            id: 1,
            address: '123 Main St',
            description: 'A beautiful place',
            coverUrl: 'https://picsum.photos/700',
            CustomButtonTitle: I18n.t('view'),
        },
        {
            id: 2,
            address: '456 Elm St',
            description: 'Another beautiful place',
            coverUrl: 'https://picsum.photos/701',
            CustomButtonTitle: I18n.t('view'),
        },
        {
            id: 3,
            address: '789 Oak St',
            description: 'Yet another beautiful place',
            coverUrl: 'https://picsum.photos/702',
            CustomButtonTitle: I18n.t('view'),
        },
        // Agrega más tarjetas si es necesario
    ];

    const chipsData = [
        { icon: require('../../../../assets/images/Icons/black/m2.png'), label: '118m2' },
        { icon: require('../../../../assets/images/Icons/black/ambientes.png'), label: '4' },
        { icon: require('../../../../assets/images/Icons/black/bed.png'), label: '3 dorm.' },
        { icon: require('../../../../assets/images/Icons/black/calendar.png'), label: '15 años' },
     ];

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <ImagePop
                    coverUrl={item.coverUrl}
                    //onCustomButtonPress={handleCardPress} // Pasa la función personalizada
                />
            </View>
        );
    };



    return (
        <View>

            <View style={styles.carouselContainer}>
                <Carousel
                    data={carouselItems}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={250} // Ancho de cada tarjeta en el carrusel
                />
            </View>
            
            <FlatList
                data={chipsData}
                style={{alignSelf: 'center', margin:5, marginTop:20}}
                renderItem={({ item }) => (
                    <Chip style={styles.chipStyle} icon={item.icon}>
                        {item.label}
                    </Chip>
                 )}
                numColumns={2} // Establece el número de columnas en 2
            />

        </View>
    ); 
};

const styles = StyleSheet.create({
    chipStyle: {
        backgroundColor: '#E0E4F2',
        alignSelf: 'center',
        margin:5,
        borderRadius: 20,
        width: 100
    },
    carouselContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
    },
});

export default IndividualPropertieScreen;