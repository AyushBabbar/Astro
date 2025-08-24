import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {
    StyleSheet,
} from "react-native";


export const Header = (props) => {
    const {title, hideBackBtn} = props;
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
                        paddingVertical: 4
                    }}
                >
                    {canGoBack() ?? hideBackBtn ? <TouchableOpacity
                        style={{flex: 0, zIndex: 2}}
                        onPress={backToPrevious}
                    >
                        <Text style={{color: '#978e8e', fontSize: 24}}>{'<'}</Text>
                    </TouchableOpacity> : <></>}

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
                                    color: '#978e8e',
                                    paddingTop: 4,
                                    fontSize: 24
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
