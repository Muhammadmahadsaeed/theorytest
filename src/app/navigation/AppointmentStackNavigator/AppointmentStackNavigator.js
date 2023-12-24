import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentScreen from '../../screens/appointments/AppointmentScreen';
import AppointmentDetailScreen from '../../screens/appointment-details/AppointmentDetails';
import AppointmentHistory from '../../screens/appointment-history/AppointmentHistory';

const Stack = createNativeStackNavigator();


const AppointmentNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="appointment"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="appointment" component={AppointmentScreen} />
            <Stack.Screen name="appointment-history" component={AppointmentHistory} />
        </Stack.Navigator>
    )
}

export default AppointmentNavigation