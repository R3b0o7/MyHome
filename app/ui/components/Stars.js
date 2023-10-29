import react from "react";
import { View, StyleSheet, Image} from "react-native";

const Stars = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/Stars/starFull.png")} style={styles.image}/>
            <Image source={require("../../assets/images/Stars/starFull.png")} style={styles.image}/>
            <Image source={require("../../assets/images/Stars/starFull.png")} style={styles.image}/>
            <Image source={require("../../assets/images/Stars/starFull.png")} style={styles.image}/>
            <Image source={require("../../assets/images/Stars/starHalf.png")} style={styles.image}/>
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    image: {
        margin: 5, // Ajusta la separación entre las imagenes
        width: 30, // Ajusta el ancho deseado
        height: 30, // Ajusta la altura deseada
    },
});

export default Stars;