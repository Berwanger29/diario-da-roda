import { StyleSheet, View } from "react-native";
import { DefaultText } from "./DefaultText";


export function EmptyList() {
    return (
        <View
            style={styles.container}
        >
            <DefaultText
                text="Clique no botão abaixo para adicionar uma nota"
                color="LIGHT_400"
                style={{
                    textAlign: "center"
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})