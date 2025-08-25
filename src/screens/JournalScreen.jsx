import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Header} from "../components/base/header";
import React, {useCallback, useEffect, useState} from 'react'
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ECacheKeys} from "../utils/cacheKeys";
import {DataCard} from "../components/base/card";


export const JournalScreen = () => {
    const navigation = useNavigation()
    const [journalEntries, setJournalEntries] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchJournals = async () => {
        setIsLoading(true)
        setError(false)
        try {
            const storedJournals = await AsyncStorage.getItem(ECacheKeys.JOURNAL_ENTRIES);
            if (storedJournals) {
                setJournalEntries(JSON.parse(storedJournals));
            }
        } catch (error) {
            setError(true)
            console.error('Error fetching journals:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchJournals()
        }, [])
    )

    // temp code to backfill journal entries
    // useEffect(() => {
    //     AsyncStorage.setItem(ECacheKeys.JOURNAL_ENTRIES, JSON.stringify([
    //         {
    //             title: '24-08-2025',
    //             content:"My journal entry for 24th Aug saved in local storage"
    //         },
    //         {
    //             title: '23-08-2025',
    //             content:"My journal entry for 23rd Aug saved in local storage"
    //         }
    //     ]))
    // }, [])

    // useEffect(() => {
    //     AsyncStorage.removeItem(ECacheKeys.JOURNAL_ENTRIES)
    // },[])

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
                onPress={() => fetchJournals()}
                style={styles.button}
            >
                <Text style={{color: "#fff", fontSize: 16}}>Retry</Text>
            </TouchableOpacity>
        </View>
    }

    const renderEmptyState = () => {
        return <View style={{marginVertical: 24, alignItems: 'center'}}>
            <Text style={styles.emptyDataText}>
                No journal entries found. Add a new one today!
            </Text>
        </View>
    }

    return <View style={{flex: 1, backgroundColor: "#151515"}}>
        <Header title="Journal"/>
        {isLoading ?
            renderLoadingState()
            : null
        }
        {(error && !isLoading) ?
            renderErrorState()
            : null
        }
        {(!error && !isLoading && (!journalEntries || !journalEntries.length)) ?
            renderEmptyState()
            : null
        }
        <FlatList
            data={journalEntries}
            renderItem={({item}) => <View style={{marginTop: 16, marginHorizontal: 16}}>
                <DataCard title={item.title} content={item.content}/>
            </View>}
            keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddJournal')}>
            <Text>
                Add Journal
            </Text>
        </TouchableOpacity>

    </View>
}

const styles = StyleSheet.create({
    emptyDataText: {
        fontSize: 24,
        color: "#978e8e",
        textAlign: 'center',
        marginHorizontal: 16
    },
    button: {
        backgroundColor: "#6c63ff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 16,
        position: 'relative',
        bottom: 40,
    }
});