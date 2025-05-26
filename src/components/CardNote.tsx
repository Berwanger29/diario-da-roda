import { StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import { CardNoteImagePreview } from "./CardNoteImagePreview";
import { useNavigation } from "@react-navigation/native";

//Título
//Descrição
//Mini-imagem
//Valor
//Data

export function CardNote() {

    const navigation = useNavigation()

    function handleNavigateToNoteScreen(){
        navigation.navigate("Note")
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={theme.CONSTANTS.activeOpacity}
            onPress={handleNavigateToNoteScreen}
        >
            <DefaultText
                text="Lorem ipsum dolor sit amet"
                fontSize="L"
                weight="MEDIUM"
            />
            <DefaultText
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                color="LIGHT_400"
            />
            <View
                style={styles.imagePreview}
            >
                <CardNoteImagePreview />
                <CardNoteImagePreview />
                <CardNoteImagePreview />
                <CardNoteImagePreview />
            </View>
            <View
                style={styles.footer}
            >
                <DefaultText
                    text="R$ 100,00"
                    fontSize="L"
                    weight="BOLD"
                />
                <DefaultText
                    text="12/12/2023"
                    color="LIGHT_400"
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        padding: theme.MEASURES.PADDING,
        gap: 12,
    },
    imagePreview: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        gap: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    }
})