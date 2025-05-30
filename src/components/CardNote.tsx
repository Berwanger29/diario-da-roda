import { StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import { CardNoteImagePreview } from "./CardNoteImagePreview";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

//Título
//Descrição
//Mini-imagem
//Valor
//Data

type Props = {
    title: string;
    description: string;
    price?: number | null | undefined;
    date: Date
}

export function CardNote({ description, price, title, date }: Props) {

    const navigation = useNavigation()

    function handleNavigateToNoteScreen() {
        navigation.navigate("Note")
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={theme.CONSTANTS.activeOpacity}
            onPress={handleNavigateToNoteScreen}
        >
            <DefaultText
                text={title}
                fontSize="L"
                weight="MEDIUM"
            />
            <DefaultText
                text={description}
                color="LIGHT_400"
            />

            {/* IMAGENS */}
            {/* <View
                style={styles.imagePreview}
            >
                <CardNoteImagePreview />
                <CardNoteImagePreview />
                <CardNoteImagePreview />
                <CardNoteImagePreview />
            </View> */}

            <View
                style={styles.footer}
            >
                {
                    price ?
                        <DefaultText
                            text={String(price)}
                            fontSize="L"
                            weight="BOLD"
                        />
                        :
                        <DefaultText
                            text=""
                        />
                }
                {
                    date ?
                        <DefaultText
                            text={String(moment(date).format('L'))}
                            color="LIGHT_400"
                        />
                        :
                        <DefaultText
                            text=""
                        />
                }
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    }
})