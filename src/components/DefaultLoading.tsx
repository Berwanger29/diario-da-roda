import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from "react-native";
import theme from "../theme/theme";

type Props = ActivityIndicatorProps & {
    size?: ActivityIndicatorProps["size"]
}

export function DefaultLoading({ size = "large", ...rest }: Props) {
    return (
        <View
            style={styles.container}
        >
            <ActivityIndicator
                size={size}
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.COLORS.DARK
    }
})