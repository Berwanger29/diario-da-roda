import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";


export function Note() {
    return (
        <SafeAreaView
            style={styles.safeAreaView}
        >
            <ScrollView
                style={styles.container}
            >
                <BackButton />
                <DefaultText
                    text="Nota XYZ"
                />

            </ScrollView>
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