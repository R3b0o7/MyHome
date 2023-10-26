import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../ui/screens/Inmobiliaria/home/HomeScreen';
import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";
import ProfileScreen from '../ui/screens/Inmobiliaria/login/ProfileScreen';
import LoginStackNavigator from './LoginStackNavigator';
import PropertiesScreen from '../ui/screens/Inmobiliaria/home/PropertiesScreen';

const Tab = createBottomTabNavigator();

export default LandingStackNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={NavigatorConstant.TAB_STACK.HOME}>
            
            <Tab.Screen
                name={NavigatorConstant.LANDING_STACK.PROPERTIES}
                component={PropertiesScreen}
                options={{ title: I18n.t('properties') }}
            />
            <Tab.Screen
                name={NavigatorConstant.LANDING_STACK.HOME}
                component={HomeScreen}
                options={{ title: I18n.t('home') }}
            />
            
            <Tab.Screen
                name={NavigatorConstant.LANDING_STACK.PROFILE}
                component={ProfileScreen}
                options={{ title: I18n.t('profile') }}
            />
           
        </Tab.Navigator >
    );
};