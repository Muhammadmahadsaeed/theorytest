/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import { name as appName } from './app.json';

async function onMessageReceived(message) {
    console.log("message==========", message);
    try {

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.displayNotification({

            title: message?.notification?.title,
            body: message?.notification?.body,
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                }
            },
        });
    } catch (error) {
        console.log("notification error=========", error);
    }
}

// Register foreground handler
messaging().onMessage(onMessageReceived);

// Register background handler
messaging().setBackgroundMessageHandler(() => {});

AppRegistry.registerComponent(appName, () => App);
