import React, { useEffect, useCallback } from 'react';
import { StyleSheet, StatusBar, LogBox, Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { NavigationContainer } from '@react-navigation/native';
import configureStore from "./app/redux/store/index";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigation from './app/navigation/RootNavigator/RootNavigator';
import CodePush from "react-native-code-push";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

const { persistor, store } = configureStore();

export default function App() {

  useEffect(() => {
    checkForUpdate()
  }, [])

  const checkForUpdate = async () => {

    try {
      const a = await CodePush.sync({
        "updateDialog": true,
        "installMode": CodePush.InstallMode.IMMEDIATE
      });
      if (a === 1) {
        CodePush.restartApp();
      }
    } catch (error) {

    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
              <StatusBar style="light" />
              <RootNavigation />
              <Toast />
              <FlashMessage position="top" />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
