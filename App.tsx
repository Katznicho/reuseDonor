import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Base from './src/screens/Base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { persistor, store } from './src/redux/store/dev';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={new QueryClient()}>
            <Base />
          </QueryClientProvider>
          <FlashMessage position="top" animated />

        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
