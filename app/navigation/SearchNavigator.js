import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";
import SearchPropertie from "../ui/screens/Users/Search/SearchPropertie";
import ResultPropertie from "../ui/screens/Users/Search/ResultPropertie";
import ViewPropertie from "../ui/screens/Users/Search/ViewPropertie";
import ComentsPropertie from "../ui/screens/Users/Search/ComentsPropertie";
import ContactPropertie from "../ui/screens/Users/Search/ContactPropertie";
import ReservePropertie from "../ui/screens/Users/Search/ReservePropertie";
import PayReserve from "../ui/screens/Users/Search/PayReserve";
import CalificationInmobiliaria from "../ui/screens/Users/Search/CalificationInmobiliaria";

const Stack = createNativeStackNavigator();

export default SearchNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.SEARCH_.SEARCH_MAIN}>
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.SEARCH_MAIN}
                component={SearchPropertie}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.RESULTS}
                component={ResultPropertie}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.PROPERTIES_USER}
                component={ViewPropertie}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.COMENTS_PROPERTIES}
                component={ComentsPropertie}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.CONTACT_PROPERTIES}
                component={ContactPropertie}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.RESERVE_PROPERTIES}
                component={ReservePropertie}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.PAY_RESERVE}
                component={PayReserve}
                options={{ title: ''}}
            />
            <Stack.Screen
                name={NavigatorConstant.SEARCH_.CALIFICATION_INM}
                component={CalificationInmobiliaria}
                options={{ title: ''}}
            />
            
            
        </Stack.Navigator >
    );
};