import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatHistory from '../../screens/chat-history/ChatHistory';
import ChatScreen from '../../screens/chat/ChatScreen';

const Stack = createNativeStackNavigator();


const ChatStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="chat-history-screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="chat-history-screen" component={ChatHistory} />
            <Stack.Screen name="chat-screen" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default ChatStackNavigator