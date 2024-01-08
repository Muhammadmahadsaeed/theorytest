import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import HelpCenter from '../../screens/help-center/HelpCenter';
import FlagAndLikeQuestion from '../../screens/flag-and-like-question/FlagAndLikeQuestion';

const Stack = createNativeStackNavigator();


const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="profile-screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile-screen" component={ProfileScreen} />
            <Stack.Screen name="flag-nd-like" component={FlagAndLikeQuestion} />
            <Stack.Screen name="help-center" component={HelpCenter} />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator