import React from 'react';
import {View} from 'react-native';
import {Header} from "../components/base/header";
import {ZodiacSelector} from "../components/ZodiacSelector";


export const ZodiacSelectorScreen = () => {

    return <View style={{flex: 1, backgroundColor: "#151515"}}>
        <Header title={'Zodiac selector'}/>
        <ZodiacSelector/>
    </View>
}