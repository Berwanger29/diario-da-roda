import { Pressable, StyleSheet } from "react-native";
import { DefaultText } from "./DefaultText";
import { DefaultIcon } from "./DefaultIcon";
import { IconProps } from 'phosphor-react-native';
import { IconName } from "../@types/iconName";
import theme from "../theme/theme";


type Props = {
    label: string;
    iconName?: IconName | null;
    isSelected?: boolean;
    onPress?: () => void;
}



export function SelectableTag({ label, iconName, isSelected = false, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, isSelected && {
                borderColor: theme.COLORS.LIGHT,
                borderWidth: 1,
                borderStyle: 'solid',
                backgroundColor: theme.COLORS.LIGHT,
            }]}
        >
            {
                iconName &&
                <DefaultIcon
                    name={iconName}
                    weight={isSelected ? 'fill' : 'regular' as IconProps['weight']}
                    color={isSelected ? theme.COLORS.DARK : theme.COLORS.LIGHT}
                />
            }

            <DefaultText
                text={label}
                color={isSelected ? 'DARK' : 'LIGHT'}
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
        padding: 8,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        marginBottom:8,
        borderColor: theme.COLORS.LIGHT_400,
        borderWidth: 1,
        borderStyle: 'solid',
    }
})