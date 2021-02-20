import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, isReadyRef} from './navigation/NavigationService';
import Toast from 'react-native-toast-message';
import {Provider as PaperProvider} from 'react-native-paper';

const AppContainer = () => {
  const {isLoading} = useSelector((state) => {
    return state.app;
  });
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => (isReadyRef.current = true)}>
      <AppNavigator />
      {isLoading && <ActivityIndicator size={'large'} style={styles.loading} />}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size={'large'} style={styles.loading} />}
        persistor={persistor}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

export default App;
