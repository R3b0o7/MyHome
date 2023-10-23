import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginInmobiliaria from "../ui/screens/Inmobiliaria/loginInmobiliaria";
import registerInmobilaria from "../ui/screens/Inmobiliaria/registerInmobilaria";
import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";
import recoveryPassword from "../ui/screens/Inmobiliaria/recoveryPassword";


const Stack = createNativeStackNavigator();

export default LoginNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.LOGIN_STACK.LOGIN}>
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.LOGIN}
                component={loginInmobiliaria}
                options={{ title: I18n.t('login') }}
            />
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.REGISTER}
                component={registerInmobilaria}
                options={{ title: I18n.t('register') }}
            />
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY}
                component={recoveryPassword}
                options={{ title: I18n.t('recoveryPassword') }}
            />
        </Stack.Navigator >
    );
};