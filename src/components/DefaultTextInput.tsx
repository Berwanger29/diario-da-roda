import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";

type Props = TextInputProps & {
    text: string
    charAmount?: number
    charMax?: number
}

export function DefaultTextInput({ text, charAmount, charMax, ...rest }: Props) {
    return (
        <View
            style={styles.container}
        >
            <DefaultText
                text={text}
                fontSize="L"
                weight="BOLD"
                style={{
                    marginBottom: theme.MEASURES.PADDING / 2
                }}
            />

            <TextInput
                style={styles.textInput}
                placeholderTextColor={theme.COLORS.LIGHT_200}
                maxLength={charMax}
                {...rest}
            />
            {
                charMax && <DefaultText
                    text={`${charAmount}/${charMax}`}
                    fontSize="S"
                    weight="LIGHT"
                    style={{
                        alignSelf: 'flex-end',
                        marginTop: theme.MEASURES.PADDING / 2,
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    textInput: {
        color: theme.COLORS.DARK_100,
        height: 50,
        padding: theme.MEASURES.PADDING / 2,
        fontSize: theme.FONT_SIZE.M,
        fontFamily: theme.FONTS.REGULAR,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        backgroundColor: theme.COLORS.LIGHT,
    }
})