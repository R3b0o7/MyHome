import LoginStackNavigator from "./LoginStackNavigator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from './NavigatorConstant';
import LandingTabNavigator from "./LandingTabNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import PropertiesStackNavigator from "./PropertiesStackNavigator";
import LandingTabUserNavigator from "./LandingTabUserNavigator";

const Stack = createNativeStackNavigator();
export default RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={NavigatorConstant.NAVIGATOR.LOGIN}
                screenOptions={{ headerShown: false }}
                headerMode="none">
                <Stack.Screen
                    name={NavigatorConstant.NAVIGATOR.LOGIN}
                    component={LoginStackNavigator}
                />
                <Stack.Screen
                    name={NavigatorConstant.LANDING_STACK.HOME}
                    component={LandingTabNavigator}
                />
                <Stack.Screen
                    name={NavigatorConstant.PROFILE_STACK.PROFILE_MAIN}
                    component={ProfileStackNavigator}
                />
                <Stack.Screen
                    name={NavigatorConstant.PROPERTIES_STACK.MYPROPERTIES}
                    component={PropertiesStackNavigator}
                />
                <Stack.Screen
                    name={NavigatorConstant.TAB_STACK_USER.TAB}
                    component={LandingTabUserNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
