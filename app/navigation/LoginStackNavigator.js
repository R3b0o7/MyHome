import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginInmobiliaria from "../ui/screens/Inmobiliaria/loginInmobiliaria";

import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";


const Stack = createNativeStackNavigator();

export default LoginNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.LOGIN_STACK.LOGIN}>
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.LOGIN}
                component={loginInmobiliaria}
                options={{ title: I18n.t('login') }}
            />
        </Stack.Navigator >
    );
};