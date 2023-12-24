import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import EditProfile from '../../screens/edit-profile/EditProfile';
import AddressesScreen from '../../screens/addresses/AddressesScreen';
import UpdateAddress from '../../screens/update-address/UpdateAddress';
import NewsScreen from '../../screens/news/NewsScreen';
import HelpCenter from '../../screens/help-center/HelpCenter';

const Stack = createNativeStackNavigator();


const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="profile-screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile-screen" component={ProfileScreen} />
            <Stack.Screen name="edit-profile" component={EditProfile} />
            <Stack.Screen name="address" component={AddressesScreen} />
            <Stack.Screen name="update-address" component={UpdateAddress} />
            <Stack.Screen name="help-center" component={HelpCenter} />
            <Stack.Screen name="news-screen" component={NewsScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator