import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen';
import SearchScreen from '../../screens/search/SearchScreen';

const Stack = createNativeStackNavigator();


const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="home-screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home-screen" component={HomeScreen} />
            <Stack.Screen name="search" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator