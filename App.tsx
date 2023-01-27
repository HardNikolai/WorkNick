import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import {persistor, store} from './src/redux/store';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={true} persistor={persistor}>
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#2A3C44" />
          <AppNavigator />
        </SafeAreaView>
      </>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;