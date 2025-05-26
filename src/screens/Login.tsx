import { StyleSheet, View } from "react-native";
import { DefaultText } from "../components/DefaultText";
import theme from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";



export function Login() {
    return (
        <SafeAreaView
            style={styles.container}
        >
            <DefaultText
                text="Login"
                weight="BOLD"
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK
    }
})