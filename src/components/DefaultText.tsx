import { StyleSheetProperties, Text, TextProps } from "react-native";
import theme from "../theme/theme";

type Props = TextProps & {
    text: string;
    weight?: "BOLD" | "MEDIUM" | "REGULAR" | "LIGHT";
    color?: "PRIMARY" | "LIGHT" | "LIGHT_400" | "DARK" | "DARK_100";
    fontSize?: keyof typeof theme.FONT_SIZE;
    size?: number;
}

export function DefaultText({ text, weight, fontSize, color, ...rest }: Props) {
    return (
        <Text
            style={[{
                fontFamily: weight ? theme.FONTS[weight] : theme.FONTS.REGULAR,
                fontSize: fontSize ? theme.FONT_SIZE[fontSize] : theme.FONT_SIZE.M,
                color: color ? theme.COLORS[color] : theme.COLORS.LIGHT,
            }, rest.style]}
            
        >
            {text}
        </Text>
    )
}