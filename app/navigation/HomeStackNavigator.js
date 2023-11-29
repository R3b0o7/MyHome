import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";
import HomeUser from "../ui/screens/Users/Home/HomeUser";
import ViewPropertie2 from "../ui/screens/Users/Search/ViewPropertie2";
import ReservePropertie2 from "../ui/screens/Users/Search/ReservePropertie2";
import ContactPropertie2 from "../ui/screens/Users/Search/ContactPropertie2";
import PayReserve2 from "../ui/screens/Users/Search/PayReserve2";
import CalificationInmobiliaria2 from "../ui/screens/Users/Search/CalificationInmobiliaria2";
import ComentsPropertie2 from "../ui/screens/Users/Search/ComentsPropertie2";

const Stack = createNativeStackNavigator();

export default PropertiesNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.HOME_USER_STACK.HOME_MAIN}>
            <Stack.Screen
                name={NavigatorConstant.HOME_USER_STACK.HOME_MAIN}
                component={HomeUser}
                options={{
                    headerShown: false,
                  }}
            />
             <Stack.Screen
                name={NavigatorConstant.HOME_USER_STACK.VIEW_PROPERTIE}
                component={ViewPropertie2}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.HOME_USER_STACK.COMENTS_PROPERTIES}
                component={ComentsPropertie2}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.HOME_USER_STACK.CONTACT_PROPERTIES}
                component={ContactPropertie2}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.HOME_USER_STACK.RESERVE}
                component={ReservePropertie2}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.HOME_USER_STACK.PAY_RESERVE}
                component={PayReserve2}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.HOME_USER_STACK.CALIFICATION_INM}
                component={CalificationInmobiliaria2}
                options={{ title: ''}}
            />
            
        </Stack.Navigator >
    );
};