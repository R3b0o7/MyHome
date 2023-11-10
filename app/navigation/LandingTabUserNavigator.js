import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigatorConstant from './NavigatorConstant';
import I18n from '../assets/strings/I18';
import { Image } from 'react-native';
import SearchNavigator from './SearchNavigator';
import HomeUser from '../ui/screens/Users/Home/HomeUser';
import ProfileUserStackNavigator from './ProfileUserStackNavigator';

const Tab = createBottomTabNavigator();

export default LandingTabUserNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={NavigatorConstant.TAB_STACK_USER.HOME}>
      <Tab.Screen
        name={NavigatorConstant.TAB_STACK_USER.SEARCH}
        component={SearchNavigator}
        options={{
          title: I18n.t('search'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../assets/images/Icons/lightMode/search2.png') : require('../assets/images/Icons/lightMode/search2.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigatorConstant.TAB_STACK_USER.HOME}
        component={HomeUser}
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
        name={NavigatorConstant.TAB_STACK_USER.PROFILE}
        component={ProfileUserStackNavigator}
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
