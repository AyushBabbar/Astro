import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Header} from "../components/base/header";
import React, {useEffect, useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ECacheKeys} from "../utils/cacheKeys";
import {useNavigation} from "@react-navigation/native";
import dayjs from "dayjs";


export const NewJournalScreen = () => {
    const [inputText, setInputText] = useState("");
    const [storedJournals, setStoreJournals] = useState([]);
    const navigation = useNavigation()

    const fetchTodayJournal = async () => {
        try {
            const cachedJournals = await AsyncStorage.getItem(ECacheKeys.JOURNAL_ENTRIES);
            if (cachedJournals) {
                const parsedCachedJournals = JSON.parse(cachedJournals);
                setStoreJournals(parsedCachedJournals)
                const todayJournal = parsedCachedJournals.find((item) => item.title === dayjs().format('DD-MM-YYYY'))
                if (todayJournal) {
                    setInputText(todayJournal.content)
                }
            }
        } catch {

        }
    };

    useEffect(() => {
        fetchTodayJournal()
    }, []);

    const handleSaveBtn = async () => {
        const localData = storedJournals
        const todayDate = dayjs().format('DD-MM-YYYY')
        const index = localData.findIndex(item => item.title === todayDate);
        if (index !== -1) {
            localData[index].content = inputText;
        } else {
            localData.unshift({ title:todayDate, content: inputText });
        }
        await AsyncStorage.setItem(ECacheKeys.JOURNAL_ENTRIES, JSON.stringify(localData));
        navigation.goBack()
    }

    return <View style={{flex: 1, backgroundColor: "#151515"}}>
        <Header title="Add Journal"/>

        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Write your thoughts..."
                placeholderTextColor={'#978e8e'}
                multiline
            />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSaveBtn()}>
            <Text>
                Save and Go back
            </Text>
        </TouchableOpacity>


    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1
    },
    input: {
        borderColor: "#6c63ff",
        color: '#978e8e',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        textAlignVertical: "top",
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