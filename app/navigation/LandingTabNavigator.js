import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../ui/screens/Inmobiliaria/TabNavigator/HomeScreen';
import NavigatorConstant from './NavigatorConstant';
import I18n from '../assets/strings/I18';
import ProfileScreen from '../ui/screens/Inmobiliaria/TabNavigator/ProfileScreen';
import PropertiesScreen from '../ui/screens/Inmobiliaria/TabNavigator/PropertiesScreen';
import PropertiesStackNavigator from './PropertiesStackNavigator';
import { Image } from 'react-native';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

export default LandingStackNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={NavigatorConstant.LANDING_STACK.INMOBILIARIA_HOME}>
      <Tab.Screen
        name={NavigatorConstant.LANDING_STACK.PROPERTIES}
        component={PropertiesStackNavigator}
        options={{
          title: I18n.t('properties'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/Icons/TabNavigator/propiedades1.png') : require('../assets/images/Icons/TabNavigator/propiedades1.png')}
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
              source={focused ? require('../assets/images/Icons/TabNavigator/inicio1.png') : require('../assets/images/Icons/TabNavigator/inicio1.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigatorConstant.LANDING_STACK.PROFILE}
        component={ProfileStackNavigator}
        options={{
          title: I18n.t('profile'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/Icons/TabNavigator/perfil1.png') : require('../assets/images/Icons/TabNavigator/perfil1.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
