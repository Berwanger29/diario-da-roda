import { SafeAreaView, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { Header } from "../components/Header";


export function Account() {
    return (
        <SafeAreaView
            style={styles.safeAreaView}
        >
            <Header
                title="Conta"
            />
            <View
                style={styles.container}
            >

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
        padding: theme.MEASURES.PADDING,
    }
})