import { StyleSheetProperties, Text, TextProps } from "react-native";
import theme from "../theme/theme";

type Props = TextProps & {
    text: string;
    weight?: keyof typeof theme["FONTS"];
    color?: keyof typeof theme["COLORS"];
    fontSize?: keyof typeof theme["FONT_SIZE"];
    size?: number;
    style?: TextProps["style"]
}

export function DefaultText({ text, weight, fontSize, color, style, ...rest }: Props) {
    return (
        <Text
            style={[{
                fontFamily: weight ? theme.FONTS[weight] : theme.FONTS.REGULAR,
                fontSize: fontSize ? theme.FONT_SIZE[fontSize] : theme.FONT_SIZE.M,
                color: color ? theme.COLORS[color] : theme.COLORS.LIGHT,
            }, style]}
            {...rest}
        >
            {text}
        </Text>
    )
}