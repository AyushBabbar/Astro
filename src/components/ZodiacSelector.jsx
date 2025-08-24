import {Button, Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {setActiveZodiac} from "../store/zodiacStore";
import {EZodiacs} from "../utils/zodiacs";

const {width} = Dimensions.get("window");
const ITEM_WIDTH = width * 0.3;
const SPACER = (width - ITEM_WIDTH) / 2;
const zodiacSigns = Object.keys(EZodiacs);

export const ZodiacSelector = () => {

    const flatListRef = useRef(null);
    const [selectedZodiac, setSelectedZodiac] = useState(zodiacSigns[0])
    const dispatch = useDispatch()
    const navigation = useNavigation()


    const data = [{key: "spacer-left"}, ...zodiacSigns.map((z, i) => ({
        key: String(i),
        label: z
    })), {key: "spacer-right"}];

    const handleScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
        const selected = zodiacSigns[index];
        if (selected) {
            setSelectedZodiac(selected)
        }
    };

    const handleBtnClick = () => {
        dispatch(setActiveZodiac(selectedZodiac))
        navigation.goBack()
    }

    return <View style={styles.container}>
        <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{alignItems: "center"}}
            renderItem={({item}) => {
                if (!item.label) {
                    return <View style={{width: SPACER}}/>;
                }
                return (
                    <View style={[styles.item, {width: ITEM_WIDTH}]}>
                        <Text style={styles.label}>{item.label}</Text>
                    </View>
                );
            }}
            onMomentumScrollEnd={handleScrollEnd}
        />
        <View style={{flex: 1, alignItems: 'center', marginBottom: 48}}>
            <View style={styles.centerIndicator}/>
        </View>
        <Button title={'Switch sign'} onPress={() => handleBtnClick()}/>

    </View>
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        marginTop: 40
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#978e8e",
    },
    centerIndicator: {
        width: 4,
        height: 30,
        backgroundColor: "red",
        borderRadius: 2,
        alignItems: 'center',
    }
});
