import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";
import I18n from "../assets/strings/I18";
import PropertiesScreen from "../ui/screens/Inmobiliaria/TabNavigator/PropertiesScreen";
import PropertiesToRegister from "../ui/screens/Inmobiliaria/TabNavigator/PropertiesToRegister";
import IndividualPropertieScreen from "../ui/screens/Inmobiliaria/TabNavigator/IndividualPropertieScreen";

const Stack = createNativeStackNavigator();

export default PropertiesNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.PROPERTIES_STACK.MYPROPERTIES}>
            <Stack.Screen
                name={NavigatorConstant.PROPERTIES_STACK.TOREGISTER}
                component={PropertiesToRegister}
                options={{ title: ''}}
            />
             <Stack.Screen
                name={NavigatorConstant.PROPERTIES_STACK.MYPROPERTIES}
                component={PropertiesScreen}
                options={{
                    headerShown: false,
                  }}
            />
             <Stack.Screen
                name={NavigatorConstant.PROPERTIES_STACK.PROPPERTIES_VIEW}
                component={IndividualPropertieScreen}
                // options={{
                //     headerShown: false,
                //   }}
            />
            
        </Stack.Navigator >
    );
};