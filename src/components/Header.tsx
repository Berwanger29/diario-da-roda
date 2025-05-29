import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    title: string;
    hasFilter?: boolean;
    showDrawerMenuIcon?: boolean
}

export function Header({ title, hasFilter, showDrawerMenuIcon = true }: Props) {

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
                weight="BOLD"
                fontSize="XL"
                color="LIGHT"
                ellipsizeMode="tail"
            />
            {
                hasFilter &&
                <View
                    style={{
                        position: "absolute",
                        right: theme.MEASURES.PADDING,
                    }}
                >
                    <FontAwesome
                        name="filter"
                        size={20}
                        color={theme.COLORS.LIGHT_400}
                    />
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flexDirection: "row",
        // backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        position: "absolute",
        left: theme.MEASURES.PADDING,
    }
})