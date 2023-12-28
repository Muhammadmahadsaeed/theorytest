import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, View, StatusBar, LogBox } from 'react-native';
import { useCallback, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import FlashMessage from "react-native-flash-message";
import { useFonts } from 'expo-font';
// import * as Updates from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { NavigationContainer } from '@react-navigation/native';
import configureStore from "./src/app/redux/store/index";
import RootNavigation from './src/app/navigation/RootNavigator/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
SplashScreen.preventAutoHideAsync();

const { persistor, store } = configureStore();

export default function App() {

  const [fontsLoaded] = useFonts({
    'EuclidCircularABold': require('./assets/fonts/EuclidCircularABold.ttf'),
    'EuclidCircularALight': require('./assets/fonts/EuclidCircularALight.ttf'),
    'EuclidCircularAMedium': require('./assets/fonts/EuclidCircularAMedium.ttf'),
    'EuclidCircularARegular': require('./assets/fonts/EuclidCircularARegular.ttf'),
    'EuclidCircularASemiBold': require('./assets/fonts/EuclidCircularASemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // onFetchUpdateAsync()
  }, [])


  // const onFetchUpdateAsync = async () => {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();
  //     if (update.isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   } catch (error) {
  //     // You can also add an alert() to see the error message in case of an error when fetching updates.
  //     alert(`Error fetching latest Expo update: ${error}`);
  //   }
  // }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <NavigationContainer>
                <RootNavigation />
              </NavigationContainer>
            </PersistGate>
          </Provider>
          <Toast />
          <FlashMessage position="top" />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
