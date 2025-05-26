import { StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";

export function Vehicle() {
    return (
        <SafeAreaView
            style={styles.safeAreaView}
        >
            <View
                style={styles.container}
            >
                <BackButton />
                <DefaultText
                    text="Carro XYZ"
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
    },
    container: {
        flex: 1,
        padding: theme.MEASURES.PADDING
    }
})