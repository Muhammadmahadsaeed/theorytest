import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CustomBottomTab from '../../components/CustomBottomTab/CustomBottomTab';
import HomeStackNavigator from '../HomeStack/HomeStackNavigator';
import ProfileStackNavigator from '../ProfileStack/ProfileStackNavigator';
import ChatStackNavigator from '../ChatStack/ChatStackNavigator';

const Tab = createBottomTabNavigator();

let Array1 = [
    "flag-nd-like",
    "help-center",
    "search"
]



const BottomTabNavigator = () => {

    const screenOptions = ({ route, navigation }) => {
        return ({
            backBehavior: 'history',
            tabBarHideOnKeyboard: true,
            headerShown: false,
        })
    };


    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            backBehavior="history"
            initialRouteName='Home'
            tabBar={props => <CustomBottomTab {...props} />}>
            <Tab.Screen name="Home" component={HomeStackNavigator}
                options={({ route }) => ({
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (Array1.includes(routeName)) {
                            return { display: "none" }
                        }
                        return
                    })(route),
                })} />
            <Tab.Screen name="Chat" component={ChatStackNavigator}
                options={({ route }) => ({
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (Array1.includes(routeName)) {
                            return { display: "none" }
                        }
                        return
                    })(route),
                })} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator}
                options={({ route }) => ({
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (Array1.includes(routeName)) {
                            return { display: "none" }
                        }
                        return
                    })(route),
                })} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator