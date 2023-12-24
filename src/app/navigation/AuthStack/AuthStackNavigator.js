import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/Login';
import RegisterScreen from '../../screens/auth/Register';
import OTPScreen from '../../screens/auth/OTPScreen';

const Stack = createNativeStackNavigator();


const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="login-screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login-screen" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="otp-screen" component={OTPScreen} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator