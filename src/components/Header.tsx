import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultIcon } from "./DefaultIcon";

type Props = {
    title: string;
    hasOptions?: boolean;
    showDrawerMenuIcon?: boolean
    optionsProps?: PressableProps
}

export function Header({ title, hasOptions, showDrawerMenuIcon = true, optionsProps }: Props) {

    const navigation = useNavigation();

    function handleToggleDrawer() {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    return (
        <View
            style={styles.continer}
        >
            {
                showDrawerMenuIcon && <Pressable
                    style={styles.icon}
                    onPress={handleToggleDrawer}
                >
                    <FontAwesome6
                        name="bars-staggered"
                        size={24}
                        color={theme.COLORS.LIGHT_400}
                    />
                </Pressable>
            }
            
                <DefaultText
                    text={title}
                    style={{
                        paddingLeft: 29,
                        paddingRight: 33
                    }}
                    weight="BOLD"
                    fontSize="XL"
                    color="LIGHT"
                    numberOfLines={1}
                />
        
            {
                hasOptions &&
                <Pressable
                    {...optionsProps}
                style={{
                    position: "absolute",
                    right: theme.MEASURES.PADDING,
                }}
                >
                    <DefaultIcon
                        name="DotsThree"
                        weight="bold"
                        size={28}
                    />
                </Pressable>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flexDirection: "row",
        // backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        paddingHorizontal: theme.MEASURES.PADDING,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        position: "absolute",
        left: theme.MEASURES.PADDING,
    }
})