import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginInmobiliaria from "../ui/screens/Inmobiliaria/login/LoginInmobiliaria";
import RegisterInmobilaria from "../ui/screens/Inmobiliaria/login/RegisterInmobilaria";
import LoginLanding from "../ui/screens/Inmobiliaria/login/LoginLanding";
import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";
import RecoveryPassword from "../ui/screens/Inmobiliaria/login/RecoveryPassword";
import LoginUser from "../ui/screens/Users/Login/LoginUser";
import ContactPropertie from "../ui/screens/Users/Search/ContactPropertie";


const Stack = createNativeStackNavigator();

export default LoginNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.LOGIN_STACK.LOGIN_LANDING}>
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.LOGIN_LANDING}
                component={ContactPropertie}
                options={{ title: I18n.t('login'), headerShown: false, }}
                
            />
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.LOGIN}
                component={LoginInmobiliaria}
                options={{ title: I18n.t('login') }}
            />
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.REGISTER}
                component={RegisterInmobilaria}
                options={{ title: I18n.t('register') }}
            />
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY}
                component={RecoveryPassword}
                options={{ title: I18n.t('recoveryPassword') }}
            />
            <Stack.Screen
                name={NavigatorConstant.LOGIN_STACK.LOGIN_USER}
                component={LoginUser}
                options={{ title: I18n.t('recoveryPassword') }}
            />

        </Stack.Navigator >
    );
};