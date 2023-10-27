import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../ui/screens/Inmobiliaria/TabNavigator/HomeScreen';
import NavigatorConstant from './NavigatorConstant';
import I18n from '../assets/strings/I18';
import ProfileScreen from '../ui/screens/Inmobiliaria/login/ProfileScreen';
import PropertiesScreen from '../ui/screens/Inmobiliaria/TabNavigator/PropertiesScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default LandingStackNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={NavigatorConstant.LANDING_STACK.INMOBILIARIA_HOME}>
      <Tab.Screen
        name={NavigatorConstant.LANDING_STACK.PROPERTIES}
        component={PropertiesScreen}
        options={{
          title: I18n.t('properties'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/Icons/lightMode/perfil.png') : require('../assets/images/Icons/lightMode/perfil.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigatorConstant.LANDING_STACK.INMOBILIARIA_HOME}
        component={HomeScreen}
        options={{
          title: I18n.t('home'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/Icons/lightMode/perfil.png') : require('../assets/images/Icons/lightMode/perfil.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigatorConstant.LANDING_STACK.PROFILE}
        component={ProfileScreen}
        options={{
          title: I18n.t('profile'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/Icons/lightMode/perfil.png') : require('../assets/images/Icons/lightMode/perfil.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
