import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import I18n from "../assets/strings/I18";

import NavigatorConstant from "./NavigatorConstant";
import ProfileScreen from "../ui/screens/Inmobiliaria/TabNavigator/ProfileScreen";
import settingsScreen from "../ui/screens/Inmobiliaria/Profile/SettingsScreen";
import comentsScreen from "../ui/screens/Inmobiliaria/Profile/ComentsScreen";

const Stack = createNativeStackNavigator();

export default ProfileStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.PROFILE_SCREEN.PROFILE}>
            <Stack.Screen
                name={NavigatorConstant.PROFILE_SCREEN.PROFILE}
                component={ProfileScreen}
                options={{ title: I18n.t('profile') }}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_SCREEN.SETTINGS}
                component={settingsScreen}
                options={{ title: I18n.t('settings') }}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_SCREEN.COMENTS}
                component={comentsScreen}
                options={{ title: I18n.t('coments') }}
            />
        </Stack.Navigator >
    );
};

