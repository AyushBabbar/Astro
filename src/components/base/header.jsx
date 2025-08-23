import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {
    StyleSheet,
} from "react-native";


export const Header = (props) => {
    const {title} = props;
    const {goBack, canGoBack} = useNavigation();
    const insets = useSafeAreaInsets();
    const backToPrevious = () => {
        if (canGoBack()) {
            goBack();
        }
    };

    return (
        <View
            style={{
                backgroundColor: "rgba(12, 11, 24,1)",
                paddingTop: insets.top,
                opacity: 0.8,
                paddingBottom: 24
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 16,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        style={{flex: 0, paddingVertical: 4, zIndex: 2}}
                        onPress={backToPrevious}
                    >
                        <Text style={{color: 'red'}}>BACK</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        {title && (
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: 'red',
                                    fontSize: 20
                                }}
                            >
                                {title}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({});
