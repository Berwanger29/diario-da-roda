import { Pressable, StyleSheet } from "react-native";

import Entypo from '@expo/vector-icons/Entypo';
import theme from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { DefaultIcon } from "./DefaultIcon";

const size = 25;

export function BackButton() {

    const navigation = useNavigation()

    return (
        <Pressable
            style={styles.container}
            onPress={()=> navigation.goBack()}
        >
            <DefaultIcon 
                name="CaretLeft"
                weight="bold"
                color={theme.COLORS.PRIMARY}
                size={size}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width:size,
        height:size,
        borderRadius:10,
        // backgroundColor: theme.COLORS.PRIMARY,
    }
})