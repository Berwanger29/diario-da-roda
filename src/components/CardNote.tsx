import { StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import { CardNoteImagePreview } from "./CardNoteImagePreview";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { formatCurrency } from "../helpers/formatCurrency";

//Título
//Descrição
//Mini-imagem
//Valor
//Data

type Props = {
    noteId: string;
    vehicleId: string
    title: string;
    description: string;
    price?: number | null | undefined;
    date: Date
}

export function CardNote({ noteId, vehicleId, description, price, title, date }: Props) {

    const navigation = useNavigation()

    function handleNavigateToNoteScreen() {
        navigation.navigate("Note", {
            vehicleId: vehicleId,
            noteId: noteId
        })
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
                weight="BOLD"
            />
            <DefaultText
                text={description}
                color="LIGHT_400"
                numberOfLines={4}
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
                            text={formatCurrency(price)}
                            fontSize="M"
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
                            text={String(moment(date).format('DD/MM/YYYY'))}
                            color="LIGHT_400"
                            weight="LIGHT"
                            fontSize="S"
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