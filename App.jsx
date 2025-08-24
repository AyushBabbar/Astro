import * as React from 'react';
import {RootNavigator} from "./src/navigation/RootNavigator";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {rootStore} from "./src/store/rootStore";
import {useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {ECacheKeys} from "./src/utils/cacheKeys";

 export default function App() {

     useEffect(() => {
         SecureStore.setItemAsync(ECacheKeys.API_KEY, 'GhiH9PQ3FFQSY259UCmnbw==NlVa1pXxKQpVQExX');
     }, []);

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
