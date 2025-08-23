import {Text, View} from "react-native";
import {Header} from "../components/base/header";

export const HomeScreen = () => {
    return <View>
        <Header title={'Home'} />

        <Text style={{backgroundColor: 'cyan'}}>
            HOME
        </Text>
    </View>
}