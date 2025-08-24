import {Text, View} from "react-native";
import {
    StyleSheet,
} from "react-native";
import React from "react";


export const DataCard = (props) => {
    const {title, date, content} = props;

    return  <View style={styles.cardContainer}>
        {title ? <Text
            style={styles.title}
        >
            {title ?? ""}
        </Text> : null}
        {date ? <Text style={styles.cardDate}>
            {date ?? ""}
        </Text> : null}
        {content ? <Text style={{fontSize: 16, lineHeight: 24, color: "#333"}}>
            {content ?? ""}
        </Text> : null}
    </View>
}


const styles = StyleSheet.create({

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
        color: "#6c63ff",
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
    cardDate: {
        fontSize: 14,
        color: "#333",
        marginBottom: 12
    }

});
