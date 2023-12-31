import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import I18n from "../assets/strings/I18";

import NavigatorConstant from "./NavigatorConstant";
import ProfileScreen from "../ui/screens/Inmobiliaria/TabNavigator/ProfileScreen";
import SettingsScreen from "../ui/screens/Inmobiliaria/Profile/SettingsScreen";
import ComentsScreen from "../ui/screens/Inmobiliaria/Profile/ComentsScreen";
import ChangePaswordScreen from "../ui/screens/Inmobiliaria/Profile/ChangePaswordScreen";
import ShiftsScreen from "../ui/screens/Inmobiliaria/Profile/ShiftsScreen";

const Stack = createNativeStackNavigator();

export default ProfileStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.PROFILE_STACK.PROFILE_MAIN}>
            <Stack.Screen
                name={NavigatorConstant.PROFILE_STACK.PROFILE_MAIN}
                component={ProfileScreen}
                options={{ title: I18n.t('profile'), headerShown: false  }}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_STACK.SETTINGS}
                component={SettingsScreen}
                options={{ title: I18n.t('settings')}}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_STACK.COMENTS}
                component={ComentsScreen}
                options={{ title: I18n.t('coments')}}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_STACK.SHIFTS}
                component={ShiftsScreen}
                options={{ title: I18n.t('shifts')}}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_STACK.CHANGE_PASWORD}
                component={ChangePaswordScreen}
                options={{ title: I18n.t('changePasword')}}
            />
        </Stack.Navigator >
    );
};

