import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/auth/Splash';
import GettingStartedScreen from '../../screens/getting-started/GettingStartedScreen';
import LocationScreen from '../../screens/location/LocationScreen';
import BottomTabNavigator from '../BottomTab/BottomTabNavigator';
import AuthStackNavigator from '../AuthStack/AuthStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading/Loading';
import { theme } from '../../utils/colors';
import TheoryTestScreen from '../../screens/theory-test/TheoryTestScreen';
import RevisionQuestion from '../../screens/revision-question/RevisionQuestion';


const Stack = createNativeStackNavigator();


const RootNavigation = () => {

    const { isAppIntro } = useSelector(state => state.userReducer)

    const [initialRoute, setInitialRoute] = useState(null);
    const [appLoading, setAppLoading] = useState(true)



    useEffect(() => {
        setTimeout(() => {
            getInitailRoute()
            setAppLoading(false)
        }, 2000);
    }, [initialRoute]);

    const getInitailRoute = () => {
        if (!isAppIntro) {
            setInitialRoute('getting')
        } else {
            setInitialRoute("bottom-tab")
        }
    }

    if (appLoading) {
        return <Loading size={60} color={theme.black} />
    }

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="getting" component={GettingStartedScreen} />
            <Stack.Screen name="bottom-tab" component={BottomTabNavigator} />
            <Stack.Screen name="theory-test" component={TheoryTestScreen} />
            <Stack.Screen name="revision-question" component={RevisionQuestion} />
            <Stack.Screen name="auth-stack" component={AuthStackNavigator} />
        </Stack.Navigator>
    )
}

export default RootNavigation