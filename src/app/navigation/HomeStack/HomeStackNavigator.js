import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen';
import CareGiverScreen from '../../screens/care-giver/CareGiver';
import CareGiverDetail from '../../screens/care-giver-detail/CareGiverDetail';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import AppointmentDetailScreen from '../../screens/appointment-details/AppointmentDetails';
import DateTimeScreen from '../../screens/date-time/DateTimeScreen';
import PaymentSuccess from '../../screens/payment/PaymentSuccess';
import UpdateAddress from '../../screens/update-address/UpdateAddress';
import SearchScreen from '../../screens/search/SearchScreen';

const Stack = createNativeStackNavigator();


const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="home-screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home-screen" component={HomeScreen} />
            <Stack.Screen name="care-giver" component={CareGiverScreen} />
            <Stack.Screen name="care-giver-detail" component={CareGiverDetail} />
            <Stack.Screen name="notification" component={NotificationScreen} />
            <Stack.Screen name="appointment-detail" component={AppointmentDetailScreen} />
            <Stack.Screen name="date-time" component={DateTimeScreen} />
            <Stack.Screen name="add-new-address" component={UpdateAddress} />
            <Stack.Screen name="payment-success" component={PaymentSuccess} />
            <Stack.Screen name="search" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator