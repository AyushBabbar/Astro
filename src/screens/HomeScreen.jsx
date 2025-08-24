import { View} from "react-native";
import {Header} from "../components/base/header";
import {HoroscopeContainer} from "../components/HoroscopeContainer";

export const HomeScreen = () => {
    return <View style={{flex: 1}}>
        <Header title={'Astro'} hidebackBtn/>
        <HoroscopeContainer />
    </View>
}