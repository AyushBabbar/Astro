import React, {useEffect} from 'react'
import {View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchHoroscope} from '../store/horoscopeStore'
import {useNavigation} from "@react-navigation/native";
import {DataCard} from "./base/card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ECacheKeys} from "../utils/cacheKeys";
import {setActiveZodiac} from "../store/zodiacStore";

export const HoroscopeContainer = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {horoscope, loading, error} = useSelector((state) => state.horoscope)

    const todayHoroscope = horoscope
    const activeZodiac = useSelector((state) => state.zodiac.activeZodiac)

    const handleActiveZodiac = async () => {
        try {
            const storedZodiac = await AsyncStorage.getItem(ECacheKeys.ACTIVE_ZODIAC);

            if (storedZodiac) {
                dispatch(setActiveZodiac(storedZodiac))
            } else {
                navigation.navigate('ZodiacSelector')
            }
        } catch (error) {
            console.error('Error fetching from storage:', error);
        }
    };


    useEffect(() => {
        if (!activeZodiac) {
            handleActiveZodiac()
        } else {
            dispatch(fetchHoroscope(activeZodiac))
        }
    }, [dispatch, activeZodiac])

    const renderLoadingState = () => {
        return <View style={{justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color="#fff"/>
        </View>
    }

    const renderErrorState = () => {
        return <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
        >
            <Text style={{color: "red", fontSize: 16, marginBottom: 10}}>
                Error
            </Text>
            <TouchableOpacity
                onPress={() => dispatch(fetchHoroscope())}
                style={styles.button}
            >
                <Text style={{color: "#fff", fontSize: 16}}>Retry</Text>
            </TouchableOpacity>
        </View>
    }

    const renderNoData = () => {
        return <Text style={styles.noDataText}>
            No data available at the moment!
        </Text>
    }


    const renderCard = () => {
        return <DataCard
            title={todayHoroscope.sign}
            date={todayHoroscope.date}
            content={todayHoroscope.horoscope}
        />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                My Horoscope
            </Text>
            {loading ?
                renderLoadingState()
                : null
            }
            {(error && !loading) ?
                renderErrorState()
                : null
            }
            {
                (!loading && !error && !todayHoroscope) ?
                    renderNoData()
                    : null
            }

            {!loading && !error && todayHoroscope ?
                renderCard()
                : null
            }
            <View style={{marginTop: 24}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation?.navigate('ZodiacSelector')}>
                    <Text>Switch Zodiac</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Jounal')}
                style={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: "#6c63ff",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Image
                    source={require('../assets/images/journal.png')}
                    style={{width: 35, height: 35}}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#151515",
        padding: 20,
        flex: 1
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        color: "#978e8e"
    },
    noDataText: {
        color: "#978e8e",
        fontSize: 16,
        marginBottom: 10
    },
    button: {
        backgroundColor: "#6c63ff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center'
    }

});
