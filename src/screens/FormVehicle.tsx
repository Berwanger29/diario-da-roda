import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";

export function FormVehicle() {
    return (
        <SafeAreaView
            style={styles.container}
        >
            <BackButton />
            <DefaultText
                text="Adicionar nota"
                weight="BOLD"
                fontSize="XL"
                color="LIGHT"
                style={{
                    marginTop: theme.MEASURES.PADDING,
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
        paddingHorizontal: theme.MEASURES.PADDING,
    }
})