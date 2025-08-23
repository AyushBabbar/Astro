import * as React from 'react';
import {RootNavigator} from "./src/navigation/RootNavigator";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {rootStore} from "./src/store/rootStore";


export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
                <Provider store={rootStore}>
                    <RootNavigator/>
                </Provider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
