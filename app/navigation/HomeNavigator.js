import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";
import HomeUser from "../ui/screens/Users/Home/HomeUser";
import ViewPropertie2 from "../ui/screens/Users/Search/ViewPropertie2";
import HomeScreen from "../ui/screens/Inmobiliaria/TabNavigator/HomeScreen";
import IndividualPropertieScreen2 from "../ui/screens/Inmobiliaria/TabNavigator/IndividualPropertieScreen2";

const Stack = createNativeStackNavigator();

export default HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.HOME_STACK.HOME_INM}>
            <Stack.Screen
                name={NavigatorConstant.HOME_STACK.HOME_INM}
                component={HomeScreen}
                options={{
                    headerShown: false,
                  }}
            />
             <Stack.Screen
                name={NavigatorConstant.HOME_STACK.PROPERTIE_INM}
                component={IndividualPropertieScreen2}
                options={{ title: ''}}
            />
            
            
        </Stack.Navigator >
    );
};