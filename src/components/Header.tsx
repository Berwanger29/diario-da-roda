import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultIcon } from "./DefaultIcon";
import { BackButton } from "./BackButton";



type Props = {
    title: string;
    variant?: "primary" | "secondary";
    showDrawerMenuIcon?: boolean
    hasOptions?: boolean;
    optionsProps?: PressableProps
}

export function Header({ title, hasOptions, showDrawerMenuIcon = true, optionsProps, variant = 'primary' }: Props) {

    const navigation = useNavigation();

    function handleToggleDrawer() {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    return (
        <View
            style={styles.continer}
        >
            {
                (showDrawerMenuIcon && variant === "primary") && <Pressable
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

            {
                (variant === 'secondary') && <View
                    style={styles.icon}
                >
                    <BackButton />
                </View>
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
                    style={styles.optionsIcon}
                    {...optionsProps}
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
        
        paddingVertical: theme.MEASURES.PADDING / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        position: "absolute",
        left: theme.MEASURES.PADDING,
    },
    backButtonPosition: {
        position: "absolute",
        left: (theme.MEASURES.PADDING ),

    },
    optionsIcon: {
        position: "absolute",
        right: (theme.MEASURES.PADDING / 2),
    }
})