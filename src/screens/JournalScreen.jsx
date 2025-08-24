import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import {Header} from "../components/base/header";
import React, {useCallback, useState} from 'react'
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ECacheKeys} from "../utils/cacheKeys";
import {fetchHoroscope} from "../store/horoscopeStore";


export const JournalScreen = () => {

    const [journalEntries, setJournalEntries] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchJournals = async () => {
        setIsLoading(true)
        setError(false)
        try {
            const storedJournals = await AsyncStorage.getItem(ECacheKeys.JOURNAL_ENTRIES);
            setJournalEntries(storedJournals);
        } catch (error) {
            setError(true)
            console.error('Error fetching key:', error);

        } finally {
            setIsLoading(false)
        }
    };

    useFocusEffect(
        useCallback(() => {

        fetchJournals()
        }, [])
    )

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

    return <View style={{flex: 1}}>
        <Header title="Journal"/>
        {isLoading ?
            renderLoadingState()
            : null
        }
        {(error && !isLoading) ?
            renderErrorState()
            : null
        }
        <FlatList
            data={journalEntries}
            renderItem={() => <></>}
            keyExtractor={(item, index) => index.toString()}
        />

    </View>
}