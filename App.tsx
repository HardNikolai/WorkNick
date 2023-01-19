import { SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./src/navigation/AppNavigator"
import { persistor, store } from "./src/redux/store";

const App = () => {

    return (
        <Provider store={store}>
            <PersistGate loading={true} persistor={persistor}>
                <>
                    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                        <StatusBar backgroundColor="#2A3C44" />
                        <AppNavigator />
                    </SafeAreaView>
                </>
            </PersistGate>
        </Provider>
    );
};

export default App;