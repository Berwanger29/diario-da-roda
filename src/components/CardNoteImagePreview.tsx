import { Image, StyleSheet, View } from "react-native";
import theme from "../theme/theme";

import image from '../assets/Car1.jpg'

export function CardNoteImagePreview() {
    return (
        <View
            style={styles.container}
        >
            <Image 
                source={image}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        overflow: 'hidden',
    }
})