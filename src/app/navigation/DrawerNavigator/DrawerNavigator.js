import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/home/HomeScreen';
import SlideDrawer from '../../components/SideBar/SlideDrawer';
import Header from '../../components/Headers/Header';
import AppointmentScreen from '../../screens/appointments/AppointmentScreen';
import FavoriteScreen from '../../screens/favorite/FavoriteScreen';
import ViewProfileScreen from '../../screens/Profile/ViewProfile';
import WebViewScreen from '../../screens/webview/WebviewScreen';
import ContactUs from '../../screens/contact-us/ContactUs';
import PaymentCardScreen from '../../screens/payment-card/PaymentCard';
import AppointmentNavigation from '../AppointmentStackNavigator/AppointmentStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                header: ({ navigation, route, options }) => (
                    <Header text={"Welcome"} navigation={navigation} />
                ),
                headerStyle: {
                    height: 80, // Specify the height of your custom header
                }
            }}

            drawerContent={(props) => <SlideDrawer {...props} />}>
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="appointment-navigation" component={AppointmentNavigation} />
            <Drawer.Screen name="favorite" component={FavoriteScreen} />
            <Drawer.Screen name="profile" component={ViewProfileScreen} />
            <Drawer.Screen name="webview" component={WebViewScreen} />
            <Drawer.Screen name="contact-us" component={ContactUs} />
            <Drawer.Screen name="payment-card" component={PaymentCardScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator