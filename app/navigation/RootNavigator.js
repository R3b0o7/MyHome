import LoginStackNavigator from "./LoginStackNavigator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATOR } from './NavigatorConstant';

const Stack = createNativeStackNavigator();
export default RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={NAVIGATOR.LOGIN}
                screenOptions={{ headerShown: false }}
                headerMode="none">
                <Stack.Screen
                    name={NAVIGATOR.LOGIN}
                    component={LoginStackNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
