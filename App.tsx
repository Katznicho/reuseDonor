import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Base from './src/screens/Base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { persistor, store } from './src/redux/store/dev';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'react-native';
import { COLORS } from './src/theme/theme';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/screens/NoInternet';

const Stack = createNativeStackNavigator();

const App = () => {
  const [connected, setIsConnected] = useState<boolean | null>(false);

  const checkInternet = () => {
    NetInfo.addEventListener((state: { isConnected: boolean | ((prevState: boolean | null) => boolean | null) | null; }) => {
      return setIsConnected(state?.isConnected);
    });
  };

  useEffect(() => { }, [connected]);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return !connected ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={new QueryClient()}>
            <StatusBar backgroundColor={COLORS.primaryOrangeHex} />
            <Base />
          </QueryClientProvider>
          <FlashMessage position="top" animated />

        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  ) : (
    <NoInternet checkInternet={checkInternet} />
  )
};

export default App;
