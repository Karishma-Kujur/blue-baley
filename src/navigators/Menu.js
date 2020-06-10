import React from 'react'
import { TouchableOpacity, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import SideMenu from './SideMenu'
import SplashScreen from '../screens/SplashScreen'
import Survey from '../screens/Survey'
import Transitions from '../screens/Transitions'
import LogOff from '../screens/LogOff'

const NavigatorMenu = (props) => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerLeft: null,
            gestureEnabled: false
        }}>
            <Stack.Screen name="Landing Page" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Survey" component={Survey} />
            <Stack.Screen name="Transitions" component={Transitions} />
            <Stack.Screen name="Log Off" component={LogOff} />
            <Stack.Screen
                name="Home"
                component={SideMenu}
            />
        </Stack.Navigator>
    )
}
export default NavigatorMenu