import { Pressable, PressableProps, StyleSheet } from "react-native";
import { DefaultIcon } from "./DefaultIcon";
import { IconName } from "../@types/iconName";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";

type Props = PressableProps & {
    label: string;
    iconName?: IconName;
    isSelected?: boolean;
    disabled?: boolean;
}

export function DefaultButton({ label, iconName, isSelected, disabled, ...rest }: Props) {
    return (
        <Pressable
            style={[styles.container,{
                backgroundColor: disabled ? theme.COLORS.LIGHT_400 : theme.COLORS.LIGHT
            }]}
            disabled={disabled}
            {...rest}
        >
            {
                iconName && (
                    <DefaultIcon
                        name={iconName}
                        color="DARK"
                    />
                )
            }
            <DefaultText
                text={label}
                color="DARK"
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height:50,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        backgroundColor: theme.COLORS.LIGHT,
        // borderColor: theme.COLORS.LIGHT_400,
        // borderWidth: 1,
        // borderStyle: 'solid',
    }
})