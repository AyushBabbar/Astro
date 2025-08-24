import React, {useEffect} from 'react'
import {View, Text, ActivityIndicator, TouchableOpacity, Button, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchHoroscope} from '../store/horoscopeStore'
import {useNavigation} from "@react-navigation/native";

export const HoroscopeContainer = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {horoscope, loading, error} = useSelector((state) => state.horoscope)

    const todayHoroscope = horoscope
    const activeZodiac = useSelector((state) => state.zodiac.activeZodiac)

    useEffect(() => {
        dispatch(fetchHoroscope(activeZodiac))
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
                style={{
                    backgroundColor: "#6c63ff",
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 10,
                }}
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
        return <View style={styles.cardContainer}>
            <Text
                style={styles.zodiacSign}
            >
                {todayHoroscope.sign ?? ""}
            </Text>
            <Text style={styles.cardDate}>
                {todayHoroscope.date ?? ""}
            </Text>
            <Text style={{fontSize: 16, lineHeight: 24, color: "#333"}}>
                {todayHoroscope.horoscope ?? ""}
            </Text>
        </View>
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

            <Button title={'Change Zodiac'} onPress={() => navigation?.navigate('ZodiacSelector')}/>
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
    cardContainer: {
        backgroundColor: "#c6c0c0",
        padding: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 2},
        elevation: 4,
    },
    zodiacSign: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
        color: "#6c63ff",
    },
    cardDate: {
        fontSize: 14,
        color: "#333",
        marginBottom: 12
    },
    noDataText: {
        color: "#978e8e",
        fontSize: 16,
        marginBottom: 10
    }

});
