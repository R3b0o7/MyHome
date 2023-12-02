import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import I18n from "../assets/strings/I18";
import NavigatorConstant from "./NavigatorConstant";
import ProfileUser from "../ui/screens/Users/Profile/ProfileUser";
import SettingsUser from "../ui/screens/Users/Profile/SettingsUser";
import ShiftsUserScreen from "../ui/screens/Users/Profile/ShiftsUserScreen"; 

const Stack = createNativeStackNavigator();

export default ProfileUserStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.PROFILE_USER_STACK.PROFILE_MAIN}>
            <Stack.Screen
                name={NavigatorConstant.PROFILE_USER_STACK.PROFILE_MAIN}
                component={ProfileUser}
                options={{ title: I18n.t('profile'), headerShown: false  }}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_STACK.SETTINGS}
                component={SettingsUser}
                options={{ title: I18n.t('settings')}}
            />
            <Stack.Screen
                name={NavigatorConstant.PROFILE_USER_STACK.SHIFTS_USER}
                component={ShiftsUserScreen}
                options={{ title: I18n.t('settings')}}
            />
        </Stack.Navigator >
    );
};
